export const generateCertificate = (name: string, date: string, id: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#DC2626');
  gradient.addColorStop(1, '#EF4444');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // White inner rectangle
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(60, 60, canvas.width - 120, canvas.height - 120);

  // Decorative border
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 8;
  ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

  // Title
  ctx.fillStyle = '#1F2937';
  ctx.font = 'bold 60px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE', canvas.width / 2, 200);

  // Subtitle
  ctx.font = '32px Arial, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('of Participation', canvas.width / 2, 260);

  // Body text
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('This is to certify that', canvas.width / 2, 350);

  // Student name
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.fillStyle = '#DC2626';
  ctx.fillText(name, canvas.width / 2, 430);

  // Achievement text
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('has successfully participated in the', canvas.width / 2, 500);
  ctx.fillText('Student Participation Campaign', canvas.width / 2, 540);

  // Date
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText(`Date: ${date}`, canvas.width / 2, 640);

  // Certificate ID
  ctx.fillText(`Certificate ID: ${id}`, canvas.width / 2, 670);

  // Signature line
  ctx.strokeStyle = '#9CA3AF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 150, 720);
  ctx.lineTo(canvas.width / 2 + 150, 720);
  ctx.stroke();

  // Signature label
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('Authorized Signature', canvas.width / 2, 750);

  return canvas.toDataURL('image/png');
};

export const downloadCertificate = (dataUrl: string, studentName: string, id: string) => {
  const link = document.createElement('a');
  link.download = `certificate_${studentName.replace(/\s+/g, '_')}_${id}.png`;
  link.href = dataUrl;
  link.click();
};
