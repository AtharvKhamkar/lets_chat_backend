import TrackingService from "../../services/tracking.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const controllerName = 'TRACKING_CONTROLLER';

class Controller{
    //Get roomId and senderId from req.params
    //check tracking document is already created or not
    //get starting lattitude and longitude from req.body
    //create new document for tracking & return as response
    async createTrackingRoom(req,res,next){
        const functionName = `${controllerName} | CREATE_TRACKING_ROOM -`;
        let senderId = req.headers['x-user-id'];
        let {roomId} = req.params;
        let {latitude,longitude} = req.body;

        try {
            //check first tracking is already created or not
            let getTrackingDetails = await TrackingService.getTrackingDetails(roomId,senderId);
            console.log(`Fetched tracking details by getTrackingDetails is ${getTrackingDetails}`);
            

            let trackingDetails = getTrackingDetails;

            if(!getTrackingDetails){
                trackingDetails = await TrackingService.createTrackingDetails(roomId,senderId,latitude,longitude);
                console.log(`created tracking details trackingDetails is ${trackingDetails}`);
            }
            
            //Need to add condtion to check isActive or not
            if(trackingDetails){
                console.log('Entered in the true condition');
                return res.status(200)
                .json(
                    new ApiResponse(
                        200,
                        trackingDetails,
                        'Tracking details fetched successfully'
                    )
                );
            }else{
                console.log('Entered in the false condition');
                return res.status(500)
                .json(
                    new ApiResponse(
                        500,
                        null,
                        'Unable to start tracking'

                    )
                )
            }
        } catch (error) {
            console.log(`${functionName}ERROR :: ${error}`);
        }
    }

    //Get latest location of the user in the tracking
        //Get senderId from req.headers
        //Get roomId from req.params
        //Check the document which is active in the database
        //send latest document
    async getLastTrackingLastLocation(req,res,next){
        const functionName = `${controllerName} | GET_LATEST_TRACKING_LAST_LOCATION -`;
        let senderId = req.headers['x-user-id'];
        let {roomId} = req.params;

        try {
            let latestTrackingDoc = await TrackingService.getTrackingDetails(roomId,senderId);

            if(!latestTrackingDoc){
                return res.status(404)
                .json(
                    new ApiResponse(
                        404,
                        null,
                        'Unable to find latest location of the sender'
                    )
                )
            }

            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    latestTrackingDoc,
                    'Latest tracking location fetched successfully'
                )
            )
        } catch (error) {
            console.log(`${functionName}ERROR :: ${error}`);
        }

    }
}

export default new Controller();