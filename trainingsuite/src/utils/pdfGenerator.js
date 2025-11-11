import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import axios from 'axios';


export default async function generateRoutinePdf(routine) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.fontSize(24).text(routine.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Goal: ${routine.goal || 'N/A'}`, { align: 'center' });
    doc.text(`Level: ${routine.level || 'N/A'}`, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

    const logoPath = path.join(process.cwd(), 'src', 'utils', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, { width: 100, align: 'center' });
    }

    doc.addPage();

    for (const day of routine.days) {
      doc.fontSize(20).text(day.day, { underline: true });
      doc.moveDown();
      if (day.notes) {
        doc.fontSize(12).text(`Notes: ${day.notes}`);
        doc.moveDown();
      }

      doc.fontSize(12);
      doc.text('Exercise | Target | Equipment | Link', { underline: true });
      doc.moveDown();

      for (const ex of day.exercises) {
        doc.text(`${ex.name} | ${ex.target} | ${ex.equipment} | ${ex.sourceEndpoint}`);
        if (ex.gifUrl) {
          try {
            doc.text(`Image: ${ex.gifUrl}`);
          } catch (e) {
          }
        }
        doc.moveDown();
      }

      doc.addPage();
    }

    doc.fontSize(10).text('Derechos reservados. Contacte al instructor si tiene alguna duda adicional.', { align: 'center' });

    doc.end();
  });
}