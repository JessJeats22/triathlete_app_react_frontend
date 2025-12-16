import './ImageUploadField.css'
import { uploadImage } from '../../services/cloudinary'

export default function ImageUploadField({ labelText = 'Upload an Image', fieldName = "image", setImage, imageURL }) {

    const handleFieldUpload = async (e) => {

        try {
            const file = e.target.files[0]
            const { data } = await uploadImage(file)
            setImage(data.secure_url)

        } catch (error) {
            console.log(error)

        }


    }

    return (
        <>
        {imageURL && <img className="uploaded-image" src={imageURL} />}
            <label htmlFor={fieldName}>{labelText}</label>
            < input type="file" name={fieldName} id={fieldName} onChange={handleFieldUpload} />
        </>
    )
}