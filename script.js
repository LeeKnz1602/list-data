let dataList = [];
let currentIndex = null;
const SHEET_API = "https://script.google.com/macros/s/AKfycbzO4gT0n9j4ShxD46XlON6xD3v_U5BONpam-czCmYFgmC-bRJ5g6qg6xd1o0L8wja6xbg/exec";


function renderTable(data, isSearch = false) {
  const tbody = document.getElementById("data-body");
  tbody.innerHTML = "";

  window.onload = function () {
  fetch(SHEET_API)
    .then((res) => res.json())
    .then((data) => {
      dataList = data;
      renderTable(dataList);
    })
    .catch((err) => {
      console.error("Gagal mengambil data:", err);
    });
};

  data.forEach((item, index) => {
  const row = `
    <tr>
    <td>${index + 1}</td>
    <td>${item.nama}</td>
    <td>${item.device}</td>
    <td>${item.serial}</td>
    <td>${item.note || ""}</td>
    <td>${item.server}</td>
    `;
  tbody.innerHTML += row;
  });
}
function refreshData() {
  fetch(SHEET_API)
  .then((res) => res.json())
  .then((data) => {
    dataList = data;
    document.getElementById("cari").value = "";
    renderTable(dataList);
  })
}

function cariData() {
  const keyword = document.getElementById("cari").value.toLowerCase().trim();
  const hasil = dataList
  .map((item, index) => ({ ...item, originalIndex: index }))
  .filter(
    (item) =>
    item.device.toLowerCase().includes(keyword) ||
    item.nama.toLowerCase().includes(keyword) ||
    (item.note && item.note.toLowerCase().includes(keyword)) ||
    (item.server && item.server.toLowerCase().includes(keyword))
  );
  renderTable(hasil, true);
}

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