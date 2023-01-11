// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app')
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require('firebase/storage');
const { Clinic } = require('../models/clinic.models');

const { ImgsClinic } = require('../models/imgsClinic.model')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSbeu0ry6qOl5-x1C6ls1YkizL8q8ysz8",
  authDomain: "pethouse-d3abc.firebaseapp.com",
  projectId: "pethouse-d3abc",
  storageBucket: "pethouse-d3abc.appspot.com",
  messagingSenderId: "188088632866",
  appId: "1:188088632866:web:1fed0282b5eee0a06c6c7b",
  measurementId: "G-XW6XDS7QZ6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp)

const uploadClinicImgs = async (imgs, clinicId) => {
    const imgsPromises = imgs.map(async (img) => {
        // Create firebase reference
        const [originalName, ext] = img.originalname.split('.')

        const filename = `clinic/${clinicId}/${originalName}-${Date.now()}.${ext}`
        const imgRef = ref(storage, filename)

        // Upload image to Firebase
        const result = await uploadBytes(imgRef, img.buffer)

        await ImgsClinic.create({
            clinicId,
            urlImg: result.metadata.fullPath,
        })
    })

    await Promise.all(imgsPromises)
}

// To find imgUrls product by product
const getClinicImgsUrls = async (clinic) => {
    const clinicImgsPromises = clinic.imgsClinics.map(async (clinicImg) => {
        const imgRef = ref(storage, clinicImg.urlImg)

        const imgUrl = await getDownloadURL(imgRef)

        clinicImg.urlImg = imgUrl

        return clinicImg
    })
    const imgsClinics = await Promise.all(clinicImgsPromises)

    clinic.imgsClinics = imgsClinics

    return clinic
}

const getClinicsImgsUrls = async (clinics) => {
    const clinicsWithImgsPromises = clinics.map(async (clinic) =>
        // Return a product whit imgUrls updated
      getClinicImgsUrls(clinic)
    )

    return await Promise.all(clinicsWithImgsPromises)
}



module.exports = {uploadClinicImgs, getClinicImgsUrls, getClinicsImgsUrls}