---
name: make-com-api-workflows
description: |
  Instructions and requirements for programmatically creating, configuring, and activating
  Make.com scenarios via the Make.com v2 API. Use this skill when the user wants to 
  automate the creation of Make.com workflows without using the manual UI.
triggers:
  - create make.com scenario
  - create make.com workflow
  - automate make.com setup
  - activate make.com scenario
  - build make.com scenario via api
invocable: true
argument-hint: "[action]"
---

# Make.com API Scenario Creation Skill

This skill defines the precise methodology an AI agent must follow to programmatically create and activate Make.com scenarios. Make.com's API is strict about JSON payloads; follow these instructions exactly to avoid validation errors.

## 1. Prerequisites & Required Variables
Before attempting to create a scenario, you MUST gather or verify the existence of the following variables in the project's environment (e.g., `.env.local`):

1.  **`MAKE_API_TOKEN`**: The authentication token.
2.  **`MAKE_TEAM_ID`**: The numeric ID of the team where the scenario will be created.
3.  **Connection IDs**: Numeric IDs for any authorized connections the modules need (e.g., Gmail, Slack, Supabase).
4.  **Webhook IDs**: Numeric IDs of custom webhooks if the scenario is triggered by one.
5.  **Base URL**: Determine the correct region (e.g., `https://eu2.make.com/api/v2` or `us1.make.com`).

*Tip:* You can find Connection IDs by querying `GET /api/v2/connections?teamId={teamId}` and Hook IDs via `GET /api/v2/hooks?teamId={teamId}`.

## 2. The Blueprint JSON
A Make.com scenario is defined by a "Blueprint" object.

*   **Structure:** A blueprint contains a `name`, and a `flow` array. Each object in the `flow` array is a module.
*   **Obtaining a Blueprint:** The most reliable way to create a complex blueprint is to build the scenario once manually in the Make.com UI, then export it via the API:
    `curl -H "Authorization: Token <TOKEN>" "https://eu2.make.com/api/v2/scenarios/<ID>/blueprint" > blueprint.json`
*   **Module Links:** Action modules must reference the correct Connection ID in their `parameters` (often mapped to the key `__IMTCONN__`).
*   **Double-Brace Syntax:** Data mapping between modules uses Make.com's internal syntax, e.g., `{{1.email}}` where `1` is the module ID.

## 3. Creating the Scenario (The POST Request)
To create the scenario, send a `POST` request to the `/scenarios` endpoint.

**CRITICAL REQUIREMENT:** The Make.com API requires the `blueprint` and `scheduling` payload fields to be **stringified JSON**, not nested JSON objects.

### Example Node.js / .mjs Implementation:
Using a `.mjs` script is highly recommended for building blueprints dynamically (e.g., reading local HTML files for email templates).

```javascript
const payload = {
  teamId: 2464095,
  blueprint: JSON.stringify(blueprintObject), // MUST BE STRINGIFIED
  scheduling: JSON.stringify({ type: "immediately" }) // MUST BE STRINGIFIED
};

const response = await fetch("https://eu2.make.com/api/v2/scenarios", {
  method: "POST",
  headers: {
    "Authorization": `Token ${apiToken}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});
const data = await response.json();
const scenarioId = data.scenario.id;
```

### Example cURL Implementation:
If using curl, ensure the escaping is correct:
```bash
curl -X POST \
  -H "Authorization: Token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": 1234567,
    "blueprint": "{\"name\":\"My Scenario\",\"flow\":[...]}",
    "scheduling": "{\"type\":\"immediately\"}"
  }' \
  "https://eu2.make.com/api/v2/scenarios"
```

## 4. Activating the Scenario
Scenarios are created in an "OFF" (inactive) state. You CANNOT turn them on by sending a PATCH request with `isActive: true`.

You MUST use the dedicated RPC endpoint `POST /scenarios/{id}/start`:

```bash
curl -X POST \
  -H "Authorization: Token <TOKEN>" \
  "https://eu2.make.com/api/v2/scenarios/<SCENARIO_ID>/start"
```
*(Note: Do not send a payload body with this request).*

If successful, the API returns the scenario object with `"isActive": true`.

## Workflow Summary for AI Agents
1. Ensure API token and Team ID are available.
2. Draft the blueprint JSON. If complex, advise the user to build a prototype in UI and use the API to extract the blueprint format first.
3. Write an `.mjs` script or bash script to assemble the final payload, ensuring `blueprint` and `scheduling` are passed as JSON strings.
4. Execute the `POST /scenarios` request to create.
5. Extract the returned Scenario ID.
6. Execute `POST /scenarios/{id}/start` to activate it.
7. Save the new Scenario ID to the project environment variables (e.g., `.env.local`).
