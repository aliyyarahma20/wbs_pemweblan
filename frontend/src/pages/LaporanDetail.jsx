import React from 'react';

const DetailLaporan = ({ laporan, onTandai, onHapus }) => {
  if (!laporan) {
    return <p>Data laporan tidak tersedia.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Detail Laporan</h2>
      <p><strong>Judul:</strong> {laporan.judul}</p>
      <p><strong>Kategori:</strong> {laporan.kategori}</p>
      <p><strong>Tanggal Kejadian:</strong> {laporan.tanggal}</p>
      <p><strong>Lokasi:</strong> {laporan.lokasi || 'Tidak Diisi'}</p>
      <p><strong>Isi Laporan:</strong><br />{laporan.isi_dekripsi}</p>
      <p><strong>Nama Pelapor:</strong> {laporan.nama_pelapor || 'Anonim'}</p>
      <p><strong>Kontak:</strong> {laporan.kontak || 'Tidak Diisi'}</p>

      {laporan.bukti && (
        <p>
          <strong>Bukti:</strong>{' '}
          <a href={`/static/bukti/${laporan.bukti}`} target="_blank" rel="noopener noreferrer">
            Lihat Bukti
          </a>
        </p>
      )}

      <button onClick={() => onTandai(laporan.id)}>Tandai Sudah Dibaca</button>
      <button onClick={() => {
        if (window.confirm('Yakin ingin menghapus laporan ini?')) {
          onHapus(laporan.id);
        }
      }}>Hapus</button>

      <br /><br />
      <a href="/admin/laporan">← Kembali ke Daftar</a>
    </div>
  );
};

export default DetailLaporan;
