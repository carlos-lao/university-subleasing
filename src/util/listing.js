// external
import { Storage, Predicates, SortDirection } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Listing, User, Like } from "../models";
import uuid from 'react-native-uuid';

// internal
import { MONTHS } from "./constants";
import { store, addLike, removeLike } from "../store";

export const formatDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export const postListing = async (listingInfo) => {
    const dir = `listings/${listingInfo.creator}/${uuid.v4()}/`

    try {
        await DataStore.save(
            new Listing({
                "title": listingInfo.title,
                "creator": listingInfo.creator,
                "description": listingInfo.description,
                "propertyType": listingInfo.propertyType,
                "roomType": listingInfo.roomType,
                "rate": listingInfo.rate,
                "negotiable": listingInfo.negotiable,
                "startDate": listingInfo.start,
                "endDate": listingInfo.end,
                "campus": listingInfo.campus,
                "address": listingInfo.address,
                "photoDirectory": dir,
                "perks": listingInfo.perks,
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

export const loadListings = async () => {
    let listings = await DataStore.query(Listing, Predicates.ALL, { sort: (s) => s.createdAt(SortDirection.DESCENDING) });
    listings = listings.map(async ({ _deleted, _lastChangedAt, _version, photoDirectory, ...listingInfo }) => {
        try {
            const { results } = await Storage.list(photoDirectory, { level: 'public', pageSize: 'ALL' });
            const imagePromises = results.map((img) => Storage.get(img.key));
            const imageResults = await Promise.all(imagePromises);
            return { ...listingInfo, photos: imageResults }
        } catch (e) {
            console.log(e.message)
            return { ...listingInfo, photos: null }
        }
    })
    listings = await Promise.all(listings)
    return listings
}

export const loadListingsById = async (listingIds) => {
    if (listingIds.length <= 0) {
        return []
    }
    let listings = await DataStore.query(Listing, l =>
        l.or(l => listingIds.map((id) => (
            l.id.eq(id)
        ))), { sort: (s) => s.createdAt(SortDirection.DESCENDING) }
    );
    listings = listings.map(async ({ _deleted, _lastChangedAt, _version, photoDirectory, ...listingInfo }) => {
        try {
            const { results } = await Storage.list(photoDirectory, { level: 'public', pageSize: 'ALL' });
            const imagePromises = results.map((img) => Storage.get(img.key));
            const imageResults = await Promise.all(imagePromises);
            return { ...listingInfo, photos: imageResults }
        } catch (e) {
            console.log(e.message)
            return { ...listingInfo, photos: null }
        }
    })
    listings = await Promise.all(listings)
    return listings
}

export const toggleLikeListing = async (listingInfo, userInfo) => {
    try {
        const toDelete = await DataStore.query(Like, l =>
            l.and(l => [
                l.userId.eq(userInfo.id),
                l.listingId.eq(listingInfo.id)
            ])
        )
        if (toDelete.length > 0) {
            store.dispatch(removeLike(toDelete[0].listingId))
            await DataStore.delete(toDelete[0])
            return false
        } else {
            const listingResult = await DataStore.query(Listing, l =>
                l.id.eq(listingInfo.id)
            )
            const userResult = await DataStore.query(User, u =>
                u.id.eq(userInfo.id)
            )
            const listing = listingResult[0]
            const user = userResult[0]
            await DataStore.save(
                new Like({
                    "user": user,
                    "listing": listing
                })
            );
            store.dispatch(addLike(listing.id))
            return true
        }
    } catch (e) {
        console.log(e.message)
    }
}