import React, { useState } from 'react';

function SubmitCaseForm() {
  const [email, setEmail] = useState('');
  const [affectedChatbots, setAffectedChatbots] = useState('');
  const [problemArea, setProblemArea] = useState('');
  const [severity, setSeverity] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState('');
  const [status,setStatus]=useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'affectedChatbots':
        setAffectedChatbots(value);
        break;
      case 'problemArea':
        setProblemArea(value);
        break;
      case 'severity':
        setSeverity(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'attachment':
        setAttachment(event.target.files[0]);
        setAttachmentName(event.target.files[0]?.name || ''); 
        break;
        case 'status':
       setStatus(event.target.checked);
          break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('affectedChatbots', affectedChatbots);
      formData.append('problemArea', problemArea);
      formData.append('severity', severity);
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('attachment', attachment);
      formData.append('status',status);

      const response = await fetch('/api/submit-case', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Case submitted successfully!');
        // Clear the form
        setEmail('');
        setAffectedChatbots('');
        setProblemArea('');
        setSeverity('');
        setSubject('');
        setDescription('');
        setAttachment(null);
        setAttachmentName('');
        setStatus(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className=' h-[740px] sm:h-[650px] w-[90%]  pt-4 rounded-md bg-white shadow-lg my-3 mx-auto'>
      <h2 className="text-xl font-bold mb-4 mx-3">Submit a Case to our Customer Support Team</h2>

      <form onSubmit={handleSubmit}>
      <div className='upper border-b-[1px]'>
        <div className="mb-4 mx-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 mx-4">
          
          <select
            id="affectedChatbots"
            name="affectedChatbots"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={affectedChatbots}
            onChange={handleChange}
            required
          >
            <option value="">Select affected chatbots</option>
            <option value="all">All chatbots</option>
            <option value="chatbot1">Chatbot 1</option>
            <option value="chatbot2">Chatbot 2</option>
          </select>
          <div className='flex  m-2 gap-3'>
           
          <input type='checkbox' className='cursor-pointer'  id="status"
            name="status" value={status}     onClick={handleChange}/>
           <label htmlFor="affectedChatbots" className="block text-sm font-medium text-gray-700">
            Does not apply
          </label>
          </div>
        </div>
        </div>
        <div className="middle flex border-b-[1px] gap-5 mt-3 ">
          <div className="mb-4 w-[49%] ml-4">
            <label htmlFor="problemArea" className="block text-sm font-medium text-gray-700">
              Problem Area
            </label>
            <select
              id="problemArea"
              name="problemArea"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={problemArea}
              onChange={handleChange}
              required
            >
              <option value="">Select problem area</option>
              <option value="technical">Technical</option>
              <option value="functional">Functional</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4 w-[49%] mr-4">
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={severity}
              onChange={handleChange}
              required
            >
              <option value="">Select severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mb-4 mx-4 my-3">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the subject"
            value={subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 mx-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the description"
            value={description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex  justify-between">
          {/* Attachment Button */}
          <label htmlFor="attachment" className="sr-only">
            Attachment
          </label>
          <div className="flex justify-between w-full bg-gray-200 rounded-md p-3">
  <p className="my-auto font-semibold">Please add a description before submitting your request.</p>
  <div className="button font-semibold gap-4 flex flex-col sm:flex-row">
    <input
      type="file"
      id="attachment"
      name="attachment"
      className="hidden"
      onChange={handleChange}
    />
    {attachmentName && <span className="text-gray-500">{attachmentName}</span>}
    <button
      type="button"
      className="bg-white text-black font-semibold px-4  py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
      onClick={() => document.getElementById('attachment').click()}
    >
      Attachments
    </button>

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-black text-white px-4  py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Submit Case
    </button>
  </div>
</div>

        </div>
      </form>
    </div>
  );
}

export default SubmitCaseForm;
