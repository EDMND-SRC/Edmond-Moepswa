'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottom: '1pt solid #EEEEEE',
    paddingBottom: 20,
  },
  logo: {
    width: 150,
  },
  titleContainer: {
    alignItems: 'flex-end' as any,
  },
  title: {
    fontSize: 24,
    color: '#111111',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#FF4D2E',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    borderBottom: '0.5pt solid #FF4D2E',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 11,
    color: '#333333',
  },
  rowLabel: {
    fontWeight: 'bold',
    width: '70%',
  },
  rowValue: {
    width: '30%',
    textAlign: 'right',
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 10,
    color: '#555555',
    paddingLeft: 10,
  },
  totalSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '2pt solid #111111',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4D2E',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    borderTop: '0.5pt solid #EEEEEE',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#999999',
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 8,
    color: '#999999',
    fontStyle: 'italic',
    lineHeight: 1.4,
  },
})

interface QuotePDFProps {
  selections: {
    serviceLabel: string
    tierLabel: string
    formattedBase: string
    addons: { name: string; qty: number; priceBWP: number }[]
    addonsSubtotalBWP: number
    deliveryLabel: string
    deliveryMultiplier: number
    staticDiscount: boolean
    staticDiscountBWP: number
    formattedTotal: string
    currency: string
  }
}

export const QuotePDF = ({ selections }: QuotePDFProps) => {
  const dateStr = new Date().toLocaleDateString('en-BW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document title={`Quote - ${selections.serviceLabel}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL || 'https://edmond-moepswa.vercel.app'}/brand/logo-horizontal.png`} style={styles.logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Project Quote</Text>
            <Text style={styles.subtitle}>{dateStr}</Text>
          </View>
        </View>

        {/* Service Core */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Package</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{selections.serviceLabel} — {selections.tierLabel}</Text>
            <Text style={styles.rowValue}>{selections.formattedBase}</Text>
          </View>
        </View>

        {/* Add-ons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Modules & Options</Text>
          {selections.addons.length > 0 ? (
            <>
              {selections.addons.map((addon, index) => (
                <View key={index} style={styles.addonItem}>
                  <Text style={{ width: '70%' }}>
                    {addon.name} {addon.qty > 1 ? `(x${addon.qty})` : ''}
                  </Text>
                  <Text style={{ width: '30%', textAlign: 'right' }}>
                    P{(addon.priceBWP * addon.qty).toLocaleString()}
                  </Text>
                </View>
              ))}
              <View style={[styles.row, { marginTop: 8, borderTop: '0.5pt dashed #EEEEEE', paddingTop: 4 }]}>
                <Text style={styles.rowLabel}>Add-ons Subtotal</Text>
                <Text style={styles.rowValue}>P{selections.addonsSubtotalBWP.toLocaleString()}</Text>
              </View>
            </>
          ) : (
            <Text style={{ fontSize: 10, color: '#999999' }}>No add-ons selected</Text>
          )}
        </View>

        {/* Delivery & Adjustments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery & Adjustments</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Speed: {selections.deliveryLabel}</Text>
            <Text style={styles.rowValue}>
              {selections.deliveryMultiplier > 0 ? `+${Math.round(selections.deliveryMultiplier * 100)}%` : 'Included'}
            </Text>
          </View>
          {selections.staticDiscount && (
            <View style={styles.row}>
              <Text style={[styles.rowLabel, { color: '#059669' }]}>Static Website Discount</Text>
              <Text style={[styles.rowValue, { color: '#059669' }]}>
                -P{selections.staticDiscountBWP.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Estimated Project Total</Text>
            <Text style={styles.totalValue}>{selections.formattedTotal}</Text>
          </View>
          <Text style={styles.disclaimer}>
            * This is an automated estimate based on selected parameters. Final pricing may vary following 
            a formal discovery session and technical requirement audit. All prices quoted in selected currency.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerText}>BridgeArc Digital / Gaborone, Botswana</Text>
            <Text style={styles.footerText}>edmond@bridgearc.com / www.bridgearc.com</Text>
          </View>
          <Text style={styles.footerText}>Ref: {selections.serviceLabel.substring(0,3).toUpperCase()}-{Math.floor(Math.random() * 9000) + 1000}</Text>
        </View>
      </Page>
    </Document>
  )
}
