import { Storage } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Listing } from "../models";
import uuid from 'react-native-uuid';

export const formatDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const uploadPost = async (listingInfo, user) => {
    const dir = `posts/${user.email.substring(0, user.email.indexOf('.', user.email.indexOf('@')))}/${uuid.v4()}/`

    try {
        await DataStore.save(
            new Listing({
                "title": listingInfo.title,
                "creator": user.id,
                "description": listingInfo.description,
                "propertyType": listingInfo.propertyType,
                "roomType": listingInfo.roomType,
                "rate": listingInfo.rate,
                "negotiable": listingInfo.negotiable,
                "campus": listingInfo.campus,
                "address": listingInfo.address,
                "perks": listingInfo.perks,
                "startDate": listingInfo.start,
                "endDate": listingInfo.end,
                "photoDirectory": dir,
                "comments": [],
                "likes": []
            })
        )

        listingInfo.photos.forEach(async (image, idx) => {
            const imageFilename = `${dir}${idx}.jpg`;
            const response = await fetch(image);
            const img = await response.blob();
            await Storage.put(imageFilename, img, {
                level: "public",
                contentType: "image/jpg",
            });
        })
    } catch (e) {
        console.log(e)
        return e.message
    }
};