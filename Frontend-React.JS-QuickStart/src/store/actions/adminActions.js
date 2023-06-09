import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { getAllCodeService,createNewUserService,
    getAllUsers, deleteUserService, editUserService, 
    getDoctorHomeService, getAllDoctors,saveDetailDoctorService} from '../../services/userService';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })


export const fetchGenderStart = () => {
    return async(dispatch,getState) => {
        try {
            dispatch({type :actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER")
            if(res && res.errCode === 0 ){
                dispatch(fetchGenderSuccess(res.data)) ;
            }else{
                dispatch(fetchGenderFailed()) ;
           
            }
    
        }catch(e){
            dispatch(fetchGenderFailed()) ;
            console.log('fetchGenderFailed', e)
        }
    }
   


}

export const fetchGenderSuccess =  (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data : genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess =  (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data : positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess =  (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data : roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const fetchPositionStart = () => {
    return async(dispatch,getState) => {
        try {

            let res = await getAllCodeService("POSITION")
            if(res && res.errCode === 0 ){
                dispatch(fetchPositionSuccess(res.data)) ;
            }else{
                dispatch(fetchPositionFailed()) ;
           
            }
    
        }catch(e){
            dispatch(fetchPositionFailed()) ;
            console.log('fetchPositionFailed', e)
        }
    }
}

export const fetchRoleStart = () => {
    return async(dispatch,getState) => {
        try {

            let res = await getAllCodeService("ROLE")
            if(res && res.errCode === 0 ){
                dispatch(fetchRoleSuccess(res.data)) ;
            }else{
                dispatch(fetchRoleFailed()) ;
           
            }
    
        }catch(e){
            dispatch(fetchRoleFailed()) ;
            console.log('fetchRoleFailed', e)
        }
    }
}

export const createNewUser = (data) => {
    return async(dispatch,getState) => {
        try {

            let res = await createNewUserService(data);
      
            if(res && res.errCode === 0 ){
                toast.success("Created new user successfully")
                dispatch(saveUserSuccess()) ;
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Fetch all  user error");
                dispatch(saveUserFailed()) ;
           
            }
    
        }catch(e){
            toast.error("Fetch all  user error");
            dispatch(saveUserFailed()) ;
            console.log('fetchRoleFailed', e)
        }
    }

}

export const saveUserSuccess = () => ({
    type : actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type : actionTypes.CREATE_USER_FAILED
})
   
    
export const fetchAllUsersStart = () => {
    return async(dispatch,getState) => {
        try {

            let res = await getAllUsers("ALL")
            if(res && res.errCode === 0 ){

                dispatch(fetchAllUsersSuccess(res.users.reverse())) ;
            }else{
                dispatch(fetchAllUsersFailed()) ;
           
            }
    
        }catch(e){
            dispatch(fetchAllUsersFailed()) ;
            console.log('fetchAllUsersFailed', e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type : actionTypes.FETCH_ALL_USERS_SUCCESS,
    users : data
})

export const fetchAllUsersFailed = () => ({
    type : actionTypes.FETCH_ALL_USERS_FAILED
})


export const deleteNewUser = (userId) => {
    return async(dispatch,getState) => {
        try {

            let res = await deleteUserService(userId);
      
            if(res && res.errCode === 0 ){
                toast.success("Delete user successfully")
                dispatch(deleteUsersSuccess()) ;
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Delete user error")
                dispatch(deleteAllUsersFailed()) ;
           
            }
    
        }catch(e){
            toast.error("Delete user error");
            dispatch(deleteAllUsersFailed()) ;
            console.log('deleteAllUsersFailed', e)
        }
    }

}

export const deleteUsersSuccess = (data) => ({
    type : actionTypes.DELETE_USER_SUCCESS,
    users : data
})

export const deleteAllUsersFailed = () => ({
    type : actionTypes.DELETE_USER_FAILED
})

export const editNewUser = (data) => {
    return async(dispatch,getState) => {
        try {

            let res = await editUserService(data);
      
            if(res && res.errCode === 0 ){
                toast.success("Update the user successfully")
                dispatch(editUsersSuccess()) ;
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Update the user error")
                dispatch(editAllUsersFailed()) ;
           
            }
    
        }catch(e){
            toast.error("Update the user error");
            dispatch(editAllUsersFailed()) ;
            console.log('editAllUsersFailed', e)
        }
    }

}

export const editUsersSuccess = () => ({
    type : actionTypes.EDIT_USER_SUCCESS,
   
})

export const editAllUsersFailed = () => ({
    type : actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () =>{
    return async(dispatch,getState) => {
        try {
            let res = await getDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors : res.data
                })
            }else{
                dispatch({
                        type : actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        }catch(e){
            console.log('FETCH_TOP_DOCTORS_FAILED : ',e)
            dispatch({
                type : actionTypes.FETCH_TOP_DOCTORS_FAILED,
        })
        }
    }
}


export const fetchAllDoctor = () =>{
    return async(dispatch,getState) => {
        try {
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr : res.data
                })
            }else{
                
                dispatch({
                        type : actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED : ',e)
            dispatch({
                type : actionTypes.FETCH_ALL_DOCTORS_FAILED,
        })
        }
    }
}



export const saveDetailDoctor = (data) =>{
    return async(dispatch,getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Save info doctor successfully")
                dispatch({
                    type : actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
           
                })
            }else{
                console.log('SAVE_DETAIL_DOCTOR_FAILED : ',res)
                toast.error("Save info doctor failed")
                dispatch({
                        type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        }catch(e){
            toast.error("Save info doctor failed")
            console.log('SAVE_DETAIL_DOCTOR_FAILED : ',e)
            dispatch({
                type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        })
        }
    }
}

export const fetchAllScheduleTime = () =>{
    return async(dispatch,getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime : res.data
                })
            }else{
                
                dispatch({
                        type : actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        }catch(e){
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED : ',e)
            dispatch({
                type : actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        })
        }
    }
}



export const getRequireDoctorInfor = () => {
    return async(dispatch,getState) => {
        try {
            dispatch({type :actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            if(resPrice && resPrice.errCode === 0 && 
                resPayment && resPayment.errCode === 0 && 
                resProvince && resProvince.errCode === 0
                ){
                    let data = {
                        resPrice : resPrice.data,
                        resPayment : resPayment.data,
                        resProvince : resProvince.data
                    }
                dispatch(getRequireDoctorInforSuccess(data)) ;
            }else{
                dispatch(getRequireDoctorInforFailed()) ;
           
            }
    
        }catch(e){
            dispatch(getRequireDoctorInforFailed()) ;
            console.log('getRequireDoctorInforFailed', e)
        }
    }
   


}

export const getRequireDoctorInforSuccess =  (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data : allRequiredData
})

export const getRequireDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED
})
