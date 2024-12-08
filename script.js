function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('kayit-tipi').addEventListener('change', function() {
    document.getElementById('ogrenci-kayit').style.display = this.value === 'ogrenci' ? 'block' : 'none';
    document.getElementById('okul-kayit').style.display = this.value === 'okul' ? 'block' : 'none';
});

document.getElementById('kayitForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let kayitTipi = document.getElementById('kayit-tipi').value;
    
    if (kayitTipi === 'ogrenci') {
        let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
        let yeniOgrenci = {
            isim: document.getElementById('isim').value,
            soyisim: document.getElementById('soyisim').value,
            il: document.getElementById('il').value,
            ilce: document.getElementById('ilce').value,
            okul: document.getElementById('okul').value,
            okul_numarasi: document.getElementById('okul_numarasi').value,
            email: document.getElementById('email').value,
            puan: 0
        };
        ogrenciler.push(yeniOgrenci);
        localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
        alert('Öğrenci kaydı başarıyla tamamlandı!');
    } else if (kayitTipi === 'okul') {
        let okullar = JSON.parse(localStorage.getItem('okullar')) || [];
        let yeniOkul = {
            okul: document.getElementById('okul').value,
            il: document.getElementById('il').value,
            ilce: document.getElementById('ilce').value,
            sifre: document.getElementById('okul_sifre').value
        };
        okullar.push(yeniOkul);
        localStorage.setItem('okullar', JSON.stringify(okullar));
        alert('Okul kaydı başarıyla tamamlandı!');
    }

    showSection(''); // Formu kapat
});

document.getElementById('veriGirisiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
    let yeniAtik = {
        ogrenci_id: document.getElementById('ogrenci_id').value,
        atik_turu: document.getElementById('atik_turu').value,
        miktar: document.getElementById('miktar').value,
        dogru_ayristirma: document.getElementById('dogru_ayristirma').value,
        teslim_alan: document.getElementById('teslim_alan').value
    };
    atiklar.push(yeniAtik);
    localStorage.setItem('atiklar', JSON.stringify(atiklar));
    alert('Veri başarıyla girildi!');
    let toplamAtikKilogrami = atiklar.reduce((total, atik) => total + parseFloat(atik.miktar), 0);
    document.getElementById('toplam-atik-kilogrami').textContent = toplamAtikKilogrami;
    showSection(''); // Formu kapat
});

document.getElementById('veriGoruntulemeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
    let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
    
    let veriGormeHtml = '<h3>Öğrenciler:</h3><ul>';
    ogrenciler.forEach((ogrenci, index) => {
        veriGormeHtml += `<li>ID: ${index}, İsim: ${ogrenci.isim}, Soyisim: ${ogrenci.soyisim}, Puan: ${ogrenci.puan}</li>`;
    });
    veriGormeHtml += '</ul>';
    
    veriGormeHtml += '<h3>Atıklar:</h3><ul>';
    atiklar.forEach((atik, index) => {
        veriGormeHtml += `<li>ID: ${index}, Öğrenci ID: ${atik.ogrenci_id}, Atık Türü: ${atik.atik_turu}, Miktar: ${atik.miktar} kg, Doğru Ayrıştırma: ${atik.dogru_ayristirma}, Teslim Alan: ${atik.teslim_alan}</li>`;
    });
    veriGormeHtml += '</ul>';
    
    document.getElementById('veriGoruntulemeContent').innerHTML = veriGormeHtml;
    showSection('veri-goruntuleme');
});
