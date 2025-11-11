export const BASE_URL = "http://localhost:5000";

// api paths
export const API_PATHS = {
    AUTH:{
        LOGIN : "/api/users/login",
        REGISTER : "/api/users/signup",
    },
    DOCTORS:{
        GET_ALL : "/api/doctors",
        GET_BY_ID : "/api/doctors",
        ADD_DOCTOR : "/api/doctors/add-doctor",
        CANCEL : "/api/doctors/cancel"
    },
    PATIENTS:{
        GET_ALL : "/api/patients",
        GET_BY_ID : "/api/appointments-patient/", 
        
    },
    APPOINTMENTS:{
        GET_ALL : "/api/appointments/get-appointments",
        GET_BY_ID : "/api/appointments/get-appointment/", 
        BOOK_APPOINTMENT : "/api/appointments/bookAppointment",
        CANCEL: "/api/appointments/cancel",
    },
    ADMIN:{
        DASHBOARD_STATS : "/api/admin/dashboard-stats",
    }

};