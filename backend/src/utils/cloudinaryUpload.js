import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


    // Configuration
    cloudinary.config({ 
       /*  cloud_name: 'mybackendprojects', 
        api_key: '273983329756818', 
        api_secret: 'tAAqrpRV9cV2M1ywkRkh-ro0pac'  */

        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
        
    });

    const uploadOnCloudinary = async (localFilePath)=>{
        try {
            if(!localFilePath)
                return null ;

            //upload 
            const uploadResponse = await cloudinary.uploader.
            upload(localFilePath, {
               folder:'chatDP',
               use_filename: true, 
               resource_type:'auto'
           } )

           //Now file has been uploaded 
           console.log("File has been uploaded successfully..!!",uploadResponse.url)
           fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          }) 
           return uploadResponse ;

        } catch (error) {
            //if the file is failed to be uploaded , then we should remove that file from our local server as well 5
            fs.unlink(localFilePath,(err) => {
                if (err) 
                console.error("Error deleting file:", err);
            
             })
             
             console.log("Error while uploading on clodinar",error) ;
            return null ; 
        }
    }

export {uploadOnCloudinary}

    
   /*  // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})(); */