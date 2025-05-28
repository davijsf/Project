class Job {
    constructor({jobName, jobStatus, jobEnvironment, jobProductivity}) {
        this.jobName = jobName;
        this.jobStatus = jobStatus;
        this.jobEnvironment = jobEnvironment;
        this.jobProductivity = jobProductivity;
    }
}

module.exports = Job;