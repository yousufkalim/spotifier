// init
import axios from "axios";

// Handle Submit
const handleOk = async (
  setButtonLoading,
  note,
  albumName,
  albumReleaseDate,
  DummyURL,
  setSubmitted
) => {
  if (note) {
    setButtonLoading(true);
    const Data = {
      albumName,
      albumReleaseDate,
      note,
    };
    await axios.post(DummyURL, Data);
    setSubmitted(true);
    setButtonLoading(false);
  }
};

// Handle Close
const handleCancel = async (setOpenModal, setNote) => {
  setOpenModal(false);
  setNote("");
};

//   Export
export { handleOk, handleCancel };
