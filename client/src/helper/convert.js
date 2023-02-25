// image into base64 component

export default function covertToBase64(file){
    return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () =>{
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) =>{
            reject(error);
        }
    })
}