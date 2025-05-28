class DailyHours {
    constructor ({dailyHoursScreen, dailyHoursStudy, dailyHoursPhone, dailyHoursLaptop,
        dailyHoursTabletdailyHoursTV, dailyHoursSocialMedia, dailyHoursWork, 
        dailyHoursEntertainment, dailyHoursGaming, dailyHoursPhysicalActivity,
        DaysPhysicalActivity, DailyMinutesMindfulness, DailyHoursNetflix
    }) {
        this.dailyHoursScreen = dailyHoursScreen;
        this.dailyHoursStudy = dailyHoursStudy; 
        this.dailyHoursPhone = dailyHoursPhone;
        this.dailyHoursLaptop = dailyHoursLaptop
        this.dailyHoursTabletdailyHoursTV = dailyHoursTabletdailyHoursTV
        this.dailyHoursSocialMedia = dailyHoursSocialMedia;
        this.dailyHoursWork = dailyHoursWork;
        this.dailyHoursEntertainment = dailyHoursEntertainment;
        this.dailyHoursGaming = dailyHoursGaming;
        this.dailyHoursPhysicalActivity = dailyHoursPhysicalActivity
        this.DaysPhysicalActivity = DaysPhysicalActivity
        this.DailyMinutesMindfulness = DailyMinutesMindfulness;
        this.DailyHoursNetflix = DailyHoursNetflix
    }
}

module.exports = DailyHours;