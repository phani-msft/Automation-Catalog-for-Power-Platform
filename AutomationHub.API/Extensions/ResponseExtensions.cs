using AutomationHub.API.Constants;
using AutomationHub.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutomationHub.API.Extensions
{
    public static class ResponseExtensions
    {
        public static ResponseModel CreateDataResponse(this ObjectResult result)
        {
            try
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.SuccessResponseStatus,
                    Data = result.Value
                };
                return resp;
            }
            catch (Exception)
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.FailResponseStatus,
                    Message = "An error occoured",
                    Data = new { }
                };
                return resp;
            }
        }

        public static ResponseModel CreateEmptyResponse(this ObjectResult result)
        {
            try
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.SuccessResponseStatus,
                };
                return resp;
            }
            catch (Exception)
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.FailResponseStatus,
                    Message = "An error occoured",
                    Data = new { }
                };
                return resp;
            }
        }


        public static ResponseModel CreateErrorResponse(this Exception exception)
        {
            try
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.FailResponseStatus,
                    Message = exception.Message,
                    Data = new { }
                };
                return resp;
            }
            catch (Exception)
            {
                ResponseModel resp = new ResponseModel()
                {
                    Status = ApplicationConstants.FailResponseStatus,
                    Message = "An error occoured",
                    Data = new { }
                };
                return resp;
            }
        }
    }
}
