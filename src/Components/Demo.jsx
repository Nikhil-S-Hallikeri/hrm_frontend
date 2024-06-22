import React from 'react'
import { useState } from 'react';

const Demo = () => {
    const [flashcards, setFlashcards] = useState([
        { term: '', definition: '', t_image: null, d_image: null }
      ]);
      
      const handleInputChange = (index, event) => {
        const { name, value, files } = event.target;
        const newFlashcards = [...flashcards];
        if (files) {
          newFlashcards[index][name] = files[0]; // Assuming only one file is selected
        } else {
          newFlashcards[index][name] = value;
        }
        setFlashcards(newFlashcards);
      };
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const formData = new FormData();
          flashcards.forEach((flashcard, index) => {
            formData.append(flashcards[${index}].t_image, flashcard.t_image);
            formData.append(flashcards[${index}].term, flashcard.term);
            formData.append(flashcards[${index}].definition, flashcard.definition);
            
            formData.append(flashcards[${index}].d_image, flashcard.d_image);
          });
      
          const response = await axios.post(${ipaddress}/flashcards/create/${flashsetId.flashset_id}/, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setCount(count+1)
          const toastLiveExample = document.getElementById('liveToast')
          document.getElementById('toastbody').style.color="green"
          document.getElementById('toastbody').textContent="Flashcards Successfully Added !!!"
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
          setFlashcards([
            { term: '', definition: '', t_image: null, d_image: null }
          ])
          console.log(response.data);
          // console.log(formData, flashcards)
        } catch (error) {
          console.error('Error:', flashcards);
        }
      };
      
      const addFlashcard = () => {
        setFlashcards([...flashcards, { term: '', definition: '', t_image: null, d_image: null }]);
      };
  return (
<div>
<div className="container my-4">
                    <form onSubmit={handleSubmit} className=''>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <div className="row m-0 mt-3">
            <div className="col-md-12 col-lg-6">
            <textarea style={{fontSize:'14px'}} className='w-100 py-3 form-control mb-2' type="text" name="term" value={flashcard.term} onChange={(event) => handleInputChange(index, event)} />
          <input type="file" name="t_image" onChange={(event) => handleInputChange(index, event)} id={t_image_${index}}/>
          {/* <label style={{backgroundColor:'#5D5FE3',fontSize:'14px',cursor:'pointer'}} className='text-white p-1 px-3 rounded-pill bg-gradient' htmlFor={t_image_${index}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg><span className='ms-2'>Upload Image</span>
          </label> */}
         
            </div>
            <div className="col-md-12 col-lg-6">
          <textarea style={{fontSize:'14px'}} className='w-100 py-3 form-control mb-2' type="text" name="definition" value={flashcard.definition} onChange={(event) => handleInputChange(index, event)} />
          <input type="file" name="d_image" onChange={(event) => handleInputChange(index, event)} id={d_image_${index}}/>
          {/* <label style={{backgroundColor:'#5D5FE3',fontSize:'14px',cursor:'pointer'}} className='text-white p-1 px-3 rounded-pill bg-gradient' htmlFor={d_image_${index}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg><span className='ms-2'>Upload Image</span></label> */}
          </div>
          </div>
        </div>
      ))}
       <div className='text-end mt-3'>
          <button className='btn btn-sm  text-white fw-medium' style={{backgroundColor:'#5D5FE3',fontSize:'14px'}} type="button" onClick={addFlashcard}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg><span className='ms-2'>Add Flashcard</span></button>
      <button className='btn btn-sm  ms-3 text-white fw-medium' style={{backgroundColor:'#5D5FE3',fontSize:'14px'}} type="submit">Submit</button>
          </div>
    </form>
     
    </div>
</div>
  )
}

export default Demo