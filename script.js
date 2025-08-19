let dataList = [];
let currentIndex = null;
const SHEET_API1 = "https://script.google.com/macros/s/AKfycbyVIxdPu2maljbJCG6x8W28CCTIAgiLTLFyZDJafmCO89AFVKuyJPh4iUkaM3zb0WkJ_w/exec";
const SHEET_API2 = "https://script.google.com/macros/s/AKfycbxVxFfU5N13CqJJz-QX8PL80o9AfmAKkElPHsanm6FOl16Ns4EWgqLSwkhd4Req6apmmw/exec";
const SHEET_API3 = "https://script.google.com/macros/s/AKfycbzvyQkfJmTuc1hnbRGHHoaSuPOUhdLGsdFYBGFKuX4yZflYKMqIEeVwcjHJyHY6AugNyw/exec";

window.onload = function () {
  refreshData();
}

function setLoading(isLoading) {
  document.getElementById("loading").style.display = isLoading ? "block" : "none";
}

function renderTable(data, isSearch = false) {
  const tbody = document.getElementById("data-body");
  tbody.innerHTML = "";
  
  data.forEach((item, index) => {
    const row = `
    <tr>
    <td>${index + 1}</td>
    <td>${item.nama}</td>
    <td>${item.device}</td>
    <td>${item.bank}</td>
    <td>${item.serial}</td>
    <td>${item.note || ""}</td>
    <td>${item.server}</td>
    `;
    tbody.innerHTML += row;
  });
}
function refreshData() {
  const selectedServer = document.getElementById("server-select").value;
  let url;

  if (selectedServer === "1") {
    url = SHEET_API1;
  } else if (selectedServer === "2") {
    url = SHEET_API2;
  } else if (selectedServer === "3") {
    url = SHEET_API3;
  }

  setLoading(true);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataList = data;
      document.getElementById("cari").value = "";
      renderTable(dataList);
    })
      .catch((err) => {
      console.error("Error fetch:", err);
      alert("Gagal mengambil data!");
    })
    .finally(() => {
      setLoading(false);
    });
}
function cariData() {
  const keyword = document.getElementById("cari").value.toLowerCase().trim();
  const hasil = dataList
  .map((item, index) => ({ ...item, originalIndex: index }))
  .filter(
    (item) =>
      item.device.toLowerCase().includes(keyword) ||
    item.nama.toLowerCase().includes(keyword)
  );
  renderTable(hasil, true);
}

// function refreshData() {
//   fetch(SHEET_API1)
//   .then((res) => res.json())
//   .then((data) => {
//     dataList = data;
//     document.getElementById("cari").value = "";
//     renderTable(dataList);
//   })
// }
//   window.onload = function () {
  //   fetch(SHEET_API)
  //     .then((res) => res.json())
  //     .then((data) => {
    //       dataList = data;
//       renderTable(dataList);
//     })
//     .catch((err) => {
  //       console.error("Gagal mengambil data:", err);
  //     });
  // };
  
// const actualIndex = isSearch ? item.originalIndex : index;

//   <td>
//     <button class="btn-tambah" onclick="editData(${actualIndex})">Edit</button>
//     <button class="btn-hapus" onclick="hapusData(${actualIndex})">Hapus</button>
//   </td>
// </tr>

// function tambahData() {
  //   const nama = document.getElementById("nama").value.trim();
  //   const device = document.getElementById("device").value.trim();
  //   const serial = document.getElementById("serial").value.trim();
  
  //   if (!nama || !device) {
//     alert("Nama dan device harus diisi!");
//     return;
//   }
//   const isDuplicate = dataList.some(
//     (item) =>
//       item.nama.toLowerCase() === nama.toLowerCase() &&
//       item.device.toLowerCase() === device.toLowerCase() &&
//       item.serial.toLowerCase() === device.toLowerCase()
//   );

//   if (isDuplicate) {
//     alert("Data yang sama sudah ada!");
//     return;
//   }

//   const newData = { nama, device, serial };

//   fetch(SHEET_API, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newData),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       dataList.push(newData);
//       renderTable(dataList);
//       document.getElementById("nama").value = "";
//       document.getElementById("device").value = "";
//       document.getElementById("serial").value = "";
//     })
//     .catch((err) => {
//       console.error("Gagal menambahkan data:", err);
//     });
// }

// function editData(index) {
//   const item = dataList[index];
//   const newNama = prompt("Edit Nama:", item.nama);
//   const newdevice = prompt("Edit Device:", item.device);  
//   const newSerial = prompt("Edit serial:", item.serial);

//   if (
//     newNama !== null &&
//     newdevice !== null &&
//     newSerial !== null &&
//     newNama.trim() !== "" &&
//     newdevice.trim() !== "" &&
//     newSerial.trim() !== ""
//   ) {
//     dataList[index] = {
//       nama: newNama.trim(),
//       device: newdevice.trim(),
//       serial: newSerial.trim(),
//     };
//     simpanKeLocalStorage();
//     renderTable(dataList);
//   }
// }

// function editData(index) {
//   currentIndex = index;
//   const item = dataList[index];

//   document.getElementById("editNama").value = item.nama;
//   document.getElementById("editDevice").value = item.device;
//   document.getElementById("editSerial").value = item.serial;
//   document.getElementById("editNote").value = item.note;
//   document.getElementById("editNote").value = item.note ? item.note : "";

//   document.getElementById("editModal").style.display = "flex";
// }

// function saveEdit() {
//   const newNama = document.getElementById("editNama").value.trim();
//   const newDevice = document.getElementById("editDevice").value.trim();
//   const newSerial = document.getElementById("editSerial").value.trim();
//   const newNote = document.getElementById("editNote").value.trim();

//   if (!newNama || !newDevice || !newSerial) {
//     alert("Semua field harus diisi!");
//     return;
//   }

//   dataList[currentIndex] = {
//     nama: newNama,
//     device: newDevice,
//     serial: newSerial,
//     note: newNote,
//   };

//   simpanKeLocalStorage();
//   renderTable(dataList);
//   closeModal();
// }

// function closeModal() {
//   document.getElementById("editModal").style.display = "none";
// }