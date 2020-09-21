/**
 * Loads a CSV into BigQuery
 */
function bigQueryLoadData(data) {
    // Google Cloud Project ID
    var projectId = '';
    // Dataset ID
    var datasetId = '';
    var tableId = 'Groups';

    // Create the data upload job.
    var job = {
        configuration: {
            load: {
                destinationTable: {
                    projectId: projectId,
                    datasetId: datasetId,
                    tableId: tableId
                },
                writeDisposition: 'WRITE_TRUNCATE'
            }
        }
    };

    var dataBlob = Utilities.newBlob(data.join('\n'), 'text/csv');
    job = BigQuery.Jobs.insert(job, projectId, dataBlob.setContentType('application/octet-stream'));
    Logger.log('Load job started. Check on the status of it here: ' +
        'https://bigquery.cloud.google.com/jobs/%s', projectId);
}