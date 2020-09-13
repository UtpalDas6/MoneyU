import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Button from 'react-bootstrap/Button';
import logo from 'C:\\Users\\Utpal Das\\Desktop\\MoneyU\\src\\rupee.png';
import Spinner from 'react-bootstrap/Spinner'

export default class DownloadButton extends React.Component {
    constructor() {
        super();
    }
    render(){
        // Create styles
    const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#e9ecef'
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#1DCDFE',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    logo: {
        width: 74,
        height: 66
    },
    right: {
        textAlign: 'right',
        fontSize: 11,
        marginBottom: 10,
        color: 'grey',
    },
    left: {
        textAlign: 'left',
        fontSize: 11,
        marginBottom: 10,
        color: 'grey',
    },
    bottom: {
        textAlign: 'center',
        marginTop: 160,
        fontSize: 11,
        color: 'grey',
    },
  });
  
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <Text style={styles.header} fixed>
            <Image style={styles.logo} src={logo} />
        </Text>
        <Text style={styles.header} fixed>
            {'  INVOICE  '}
        </Text>
        <Text style={styles.right} fixed>
            Invoice No. : {this.props.invoice}
        </Text>
        <Text style={styles.right} fixed>
            Date : {this.props.date}
        </Text>
        <Text style={styles.left} fixed>
            {' Bill To. : '}
        </Text>
        <Text style={styles.left} fixed>
             Name : {this.props.name}
        </Text>
        <Text style={styles.left} fixed>
            {' Mob : 9437802568'}
        </Text>
        <Text fixed>Item             Quantity         Amount</Text>
        <Text fixed>=====================================================</Text>
        <Text fixed>{this.props.item}              1                 Rs.{this.props.amount}</Text>
        <Text fixed>{'\n'}</Text>
        <Text fixed>GST : 2.5%</Text>
        <Text fixed>Grand Total : Rs.{Math.round(Number(this.props.amount)*1.025)}</Text>
        <Text style={styles.bottom} fixed>
            {' THANK YOU FOR YOUR BUSINESS. '}
        </Text>
        </View>
      </Page>
    </Document>
  );
    const GeneratePdf = () => (
    <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
    {({ blob, url, loading, error }) => (loading ? <Spinner animation="grow" variant="info" /> :
    <Button variant='outline-info'>Invoice</Button>)}
    </PDFDownloadLink>
    )
    return(
    <React.Fragment>
        {<GeneratePdf />}
    </React.Fragment>);
    }
}