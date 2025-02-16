import mongoose from "mongoose";
import { Tracking } from "../models/tracking.model.js";

const serviceName = 'TRACKING_SERVICE';

class TrackingService{
    async getTrackingDetails(roomId,senderId){
        const functionName = 'GET_TRACKING_DETAILS';
        try {
            const existedTrackingDetails = await Tracking.findOne(
                {
                    roomId,
                    senderId,
                    isActive:true
                }
            ).sort({updatedAt:-1});

            return existedTrackingDetails;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }

    async createTrackingDetails(roomId,senderId,latitude,longitude){
        const functionName = 'CREATE_TRACKING_DETAILS';
        try {
            const createdTrackingDetails = await Tracking.create({
                roomId,
                senderId,
                latitude,
                longitude
            })

            return createdTrackingDetails;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }

    async updateTrackingDocument(roomId, senderId, longitude, latitude){
        const functionName = 'UPDATE_TRACKING_DOCUMENT';
        try {
            const updatedLocationDocument = await Tracking.findOneAndUpdate(
                {roomId,senderId},
                {longitude,latitude,isActive:true},
                {upsert:true,new:true}
            );

            return updatedLocationDocument;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }

    async stopTracking(roomId, senderId){
        const functionName = 'STOP_TRACKING';
        try {
            const stoppedLocationDocument = await Tracking.findOneAndUpdate(
                {roomId, senderId},
                {isActive:false},
            );

            return stoppedLocationDocument;
        } catch (error) {
            console.log(`${serviceName}|${functionName}Error :: ${error}`);
        }
    }
}

export default new TrackingService