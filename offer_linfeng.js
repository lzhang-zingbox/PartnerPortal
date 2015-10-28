var MULTI_OFFER_ATTRIBUTES = [
    "uuid",
    "short_desc",
    "store_name"
];

var OFFER_ATTRIBUTES = [
    "uuid",
    "created",
    "partner_uuid",
    "long_desc",
    "short_desc",
    "store_name",
    "match_name",
    "store_address",
    "store_phone",
    "terms",
    "start_date",
    "end_date",
    "discount",
    //"image_url",
    "redeem_password",
    "redeem_password_confirmed",
    "radius",
    "latitude",
    "longitude",
    "image_type",
    "image_data",
    "AVG_DWELL_TIME",
    "NUM_VISITS",
    "NUM_REDEMPTIONS"
];

function createOffer(createOfferObj, successCB, errorCB) {
    createOfferObj.partner_uuid = PARTNER_UUID;
    //createOfferObj.match_name = createOfferObj.store_name.replace(/\W/g, '')
    //old
    //postEntity(createOfferObj, successCB, errorCB);
    //new
    $.ajax({
        type: "POST",
        //url: "http://xixixhalu-test.apigee.net/proxy/tripPlanner/",
        url: "http://localhost:3000/partnerPortal/createOffer",
        data: createOfferObj,
        //discuss parameters for success and error
        success: successCB, 
        error: errorCB,
        dataType: "json"
    });
}

function readOffer(uuid, successCB, errorCB) {
    //getEntity("offer", uuid, OFFER_ATTRIBUTES, successCB, errorCB);
    $.ajax({
        type: "GET",
        //url: "http://xixixhalu-test.apigee.net/proxy/tripPlanner/",
        url: "http://localhost:3000/partnerPortal/getOffer?offer_uuid=" + uuid,
        //discuss parameters for success and error
        success: successCB, 
        error: errorCB,
        dataType: "json"
    });
}

function readMultipleOffers(attribute, uuid, successCB, errorCB) {
    //var query = "select uuid, short_desc, store_name where " + attribute + " = " + uuid + " order by created desc";
    //getSpecifiedAttributesFromEntity("offer", query, MULTI_OFFER_ATTRIBUTES, successCB, errorCB);
    //getEntities("offer", attribute, value, MULTI_OFFER_ATTRIBUTES, successCB, errorCB);
    
    $.ajax({
        type: "GET",
        //url: "http://xixixhalu-test.apigee.net/proxy/tripPlanner/",
        url: "http://localhost:3000/partnerPortal/getOffers?partner_uuid=" + uuid,
        //discuss parameters for success and error
        success: successCB, 
        error: errorCB,
        dataType: "json"
    });
}

function updateOffer(uuid, updateOfferObj, successCB, errorCB) {
    updateOfferObj.uuid = uuid;
    //updateOfferObj.type = "offer";
    //modifyEntity(updateOfferObj, successCB, errorCB);
    $.ajax({
        type: "POST",
        //url: "http://xixixhalu-test.apigee.net/proxy/tripPlanner/",
        url: "http://localhost:3000/partnerPortal/updateOffer?partner_uuid=" + uuid,
        data: updateOfferObj,
        success: successCB, 
        error: errorCB,
        dataType: "json"
    });
}

function deleteOffer(uuid, successCB, errorCB) {
    deleteEntity("offer", uuid, successCB, errorCB);
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/partnerPortal/deleteOffer?partner_uuid=" + uuid,
        success: successCB,
        error: errorCB,
        dataType: "json"
    });
}

function deleteAllOffersBelongingToPartner(partnerUUID, successCB, errorCB) {
    deleteEntities("offer", "partner_uuid", partnerUUID, successCB, errorCB);
}

function readSpecifiedOffers(query, successCB, errorCB) {
    getSpecifiedEntities("offer", query, OFFER_ATTRIBUTES, successCB, errorCB);
    /*
    $.ajax({
        type: "GET",
        //url: "http://xixixhalu-test.apigee.net/proxy/tripPlanner/",
        url: "http://localhost:3000/partnerPortal/readMultipleOffers?partner_uuid=" + uuid,
        data: updateOfferObj,
        success: successCB, 
        error: errorCB,
        dataType: "json"
    });
    */
};

//coupon.js
function createCoupon(createCouponObj, successCB, errorCB) {
    createCouponObj.type = "coupon";
    postEntity(createCouponObj, successCB, errorCB);
}

function readCoupon(uuid, successCB, errorCB) {
    getEntity("coupon", uuid, COUPON_ATTRIBUTES, successCB, errorCB);
}

function readMultipleCoupons(attribute, value, successCB, errorCB) {
    getEntities("coupon", attribute, value, COUPON_ATTRIBUTES, successCB, errorCB);
}

function deleteCoupon(uuid, successCB, errorCB) {
    deleteEntity("coupon", uuid, successCB, errorCB);
}

function deleteCouponsForOffer(uuid, successCB, errorCB) {
    deleteEntities("coupon", "offer_uuid", uuid, successCB, errorCB);
}

//geofence.js
function createGeofence(createGeofenceObj, successCB, errorCB) {
    createGeofenceObj.type = "geofence";
    postEntity(createGeofenceObj, successCB, errorCB);
}

function readGeofence(uuid, successCB, errorCB) {
    getEntity("eofence", uuid, GEOFENCE_ATTRIBUTES, successCB, errorCB);
}

function readMultipleGeofences(attribute, value, successCB, errorCB) {
    getEntities("geofence", attribute, value, GEOFENCE_ATTRIBUTES, successCB, errorCB);
}

function deleteGeofence(uuid, successCB, errorCB) {
    deleteEntity("geofence", uuid, successCB, errorCB);
}

function deleteGeofencesForOffer(uuid, successCB, errorCB) {
    deleteEntities("geofence", "offer_uuid", uuid, successCB, errorCB);
}
