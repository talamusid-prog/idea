import Swal from 'sweetalert2';

// Konfigurasi default untuk SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

// Success notifications
export const showSuccess = (message: string) => {
  Toast.fire({
    icon: 'success',
    title: message,
    background: '#f0fdf4',
    color: '#166534',
    iconColor: '#16a34a'
  });
};

// Error notifications
export const showError = (message: string) => {
  Toast.fire({
    icon: 'error',
    title: message,
    background: '#fef2f2',
    color: '#991b1b',
    iconColor: '#dc2626'
  });
};

// Warning notifications
export const showWarning = (message: string) => {
  Toast.fire({
    icon: 'warning',
    title: message,
    background: '#fffbeb',
    color: '#92400e',
    iconColor: '#f59e0b'
  });
};

// Info notifications
export const showInfo = (message: string) => {
  Toast.fire({
    icon: 'info',
    title: message,
    background: '#eff6ff',
    color: '#1e40af',
    iconColor: '#3b82f6'
  });
};

// Confirmation dialogs
export const showConfirm = async (title: string, text: string = '') => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
    background: '#ffffff',
    color: '#374151',
    customClass: {
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg',
      cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'
    }
  });
  
  return result.isConfirmed;
};

// Success with redirect
export const showSuccessAndRedirect = (message: string, redirectUrl: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: message,
    background: '#f0fdf4',
    color: '#166534',
    iconColor: '#16a34a',
    confirmButtonColor: '#16a34a',
    confirmButtonText: 'OK'
  }).then(() => {
    window.location.href = redirectUrl;
  });
};

// Loading state
export const showLoading = (title: string = 'Memproses...') => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Close loading
export const closeLoading = () => {
  Swal.close();
};
