const RiskManagement = require('metaapi.cloud-sdk').RiskManagement;
const PeriodStatisticsListener = require('metaapi.cloud-sdk').PeriodStatisticsListener;

// your MetaApi API token
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4OGI4OWUxZTlmNzE5ZTZkNGRjM2ZmMjAyMDdjMzkzZCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDdiNTZhZGEtYWM1Ny00MWI3LWJkYjEtMTExNjQ2MmNhZmQ4Il19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowN2I1NmFkYS1hYzU3LTQxYjctYmRiMS0xMTE2NDYyY2FmZDgiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA3YjU2YWRhLWFjNTctNDFiNy1iZGIxLTExMTY0NjJjYWZkOCJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjA3YjU2YWRhLWFjNTctNDFiNy1iZGIxLTExMTY0NjJjYWZkOCJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDowN2I1NmFkYS1hYzU3LTQxYjctYmRiMS0xMTE2NDYyY2FmZDgiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6MDdiNTZhZGEtYWM1Ny00MWI3LWJkYjEtMTExNjQ2MmNhZmQ4Il19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDowN2I1NmFkYS1hYzU3LTQxYjctYmRiMS0xMTE2NDYyY2FmZDgiXX0seyJpZCI6Im10LW1hbmFnZXItYXBpIiwibWV0aG9kcyI6WyJtdC1tYW5hZ2VyLWFwaTpyZXN0OmRlYWxpbmc6KjoqIiwibXQtbWFuYWdlci1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiYmlsbGluZy1hcGkiLCJtZXRob2RzIjpbImJpbGxpbmctYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX1dLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiODhiODllMWU5ZjcxOWU2ZDRkYzNmZjIwMjA3YzM5M2QiLCJpYXQiOjE3MTIwNjMzNDIsImV4cCI6MTcxOTgzOTM0Mn0.g-52P3c8koAhpuBRsp5wYHfy6O6ES67TxcL9swk_HKCXxRQ85KLbf3H3nFEmudJmOz7cfiTlOJqwO754oEGOTEoLi0Vjjm9tGkL-8dcJF0TEUWyWy_8Uwod9uxVw-92_qNiWbehvCCCSWOcGjRPnZXwElT0TJ8TI08D9OxcCmLoIhenZmjGd2sWws5jCXZBxn5K7y-Z28wHwPLhAPHDpw1hnfdu03iatMiS0h7MnmuR3HHPuM6-IQYPK_vf0RuJ5EMzWw-reh413DNbMfS9mycYspfgGXfOixf7oDvElIlZbVd6LSuBAE6knR6y7_LP01hRyD69v4dDBDCyg_mRFZIB8wYqMrVNGUl299UzK-pzjxu7uB6CEyuLDLJK6mShQrulDaYp5-ChkPIrMG0oxRlnf4tQhhHzfgskUhaTkmBevA1N86F57-9ZUows22YgGNAem3c3v1vmxI91-A6I1vPRSAPEdnSRzkLRqFg0FeLi4-PPvDvTnrTih9Qk8h932ddE7Kbsh581v0meTLgAmcq9sPCVkdXEQF-FLzBZpJjX_T3vz52JbwknVEORiNAKxLd64TsVYnMfDuIuRlywnv8EjFLKTHISNZmW3huxLQ5yen7irS6MwWW9U3UfFsiL7djPFDQGLulMIm7Iym-H22rPi1KANPEowHokfxeUJDyE';
// your MetaApi account id
// the account must have field riskManagementApiEnabled set to true
const accountId = '07b56ada-ac57-41b7-bdb1-1116462cafd8';
const domain = 'agiliumtrade.agiliumtrade.ai';

const riskManagement = new RiskManagement(token, {domain});
const riskManagementApi = riskManagement.riskManagementApi;

class ExamplePeriodStatisticsListener extends PeriodStatisticsListener {
  async onPeriodStatisticsUpdated(periodStatisticsEvent) {
    console.log('period statistics updated', periodStatisticsEvent);
  }

  async onPeriodStatisticsCompleted() {
    console.log('period completed event received');
  }

  async onTrackerCompleted(){
    console.log('tracker completed event received');
  }

  async onConnected() {
    console.log('on connected event received');
  }

  async onDisconnected() {
    console.log('on disconnected event received');
  }

  async onError(error) {
    console.log('error event received', error);
  }
}

async function main() {
  try {
    // creating a tracker
    const trackerId = await riskManagementApi.createTracker(accountId, {
      name: 'example-tracker',
      absoluteDrawdownThreshold: 5,
      period: 'day'
    });
    console.log('Created an event tracker ' + trackerId.id);

    // adding a period statistics listener
    const periodStatisticsListener = new ExamplePeriodStatisticsListener(accountId, trackerId.id);
    const listenerId =
      await riskManagementApi.addPeriodStatisticsListener(periodStatisticsListener, accountId, trackerId.id);

    console.log('Streaming period statistics events for 1 minute...');
    await new Promise(res => setTimeout(res, 1000 * 60));
    riskManagementApi.removePeriodStatisticsListener(listenerId);

    const equityChart = await riskManagementApi.getEquityChart(accountId);
    console.log('period statistics', JSON.stringify(equityChart));
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

main();
