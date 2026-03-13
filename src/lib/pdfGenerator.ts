import jsPDF from 'jspdf'

interface ProposalData {
  clientName: string
  projectTitle: string
  projectDescription: string
  scope: string[]
  timeline: string
  deliverables: string[]
  hourlyRate: number
  projectHours: number
  projectTotal: number
  paymentTerms: string
  yourName: string
  yourEmail: string
  yourPhone: string
}

export async function generateProposalPDF(data: ProposalData, templateId: string) {
  const doc = new jsPDF()
  
  // Set up colors and fonts
  const primaryColor = [59, 130, 246] // Blue
  const textColor = [55, 65, 81] // Gray-700
  const lightGray = [229, 231, 235] // Gray-200
  
  let yPosition = 30
  
  // Header
  doc.setFontSize(24)
  doc.setTextColor(...primaryColor)
  doc.text('PROJECT PROPOSAL', 20, yPosition)
  
  yPosition += 15
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, yPosition)
  
  // Client Information
  yPosition += 20
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('CLIENT INFORMATION', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(`Client: ${data.clientName}`, 20, yPosition)
  yPosition += 8
  doc.text(`Project: ${data.projectTitle}`, 20, yPosition)
  
  // Project Description
  if (data.projectDescription) {
    yPosition += 15
    doc.setFontSize(16)
    doc.setTextColor(...primaryColor)
    doc.text('PROJECT OVERVIEW', 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(12)
    doc.setTextColor(...textColor)
    
    // Wrap text for description
    const descriptionLines = doc.splitTextToSize(data.projectDescription, 170)
    doc.text(descriptionLines, 20, yPosition)
    yPosition += descriptionLines.length * 6
  }
  
  // Project Scope
  yPosition += 15
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('PROJECT SCOPE', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  data.scope.filter(item => item.trim()).forEach((item, index) => {
    doc.text(`• ${item}`, 25, yPosition)
    yPosition += 6
  })
  
  // Deliverables
  yPosition += 10
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('DELIVERABLES', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  data.deliverables.filter(item => item.trim()).forEach((item, index) => {
    doc.text(`• ${item}`, 25, yPosition)
    yPosition += 6
  })
  
  // Timeline
  yPosition += 15
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('TIMELINE', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(`Estimated completion time: ${data.timeline}`, 20, yPosition)
  
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 30
  }
  
  // Pricing Section
  yPosition += 20
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('PRICING', 20, yPosition)
  
  yPosition += 15
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  
  // Pricing table background
  doc.setFillColor(...lightGray)
  doc.rect(20, yPosition - 5, 170, 35, 'F')
  
  doc.text(`Hourly Rate: $${data.hourlyRate}`, 25, yPosition + 5)
  doc.text(`Estimated Hours: ${data.projectHours}`, 25, yPosition + 15)
  
  doc.setFontSize(14)
  doc.setTextColor(...primaryColor)
  doc.text(`Total Project Cost: $${data.projectTotal.toLocaleString()}`, 25, yPosition + 27)
  
  yPosition += 45
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(`Payment Terms: ${data.paymentTerms}`, 20, yPosition)
  
  // Your Information
  yPosition += 20
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.text('CONTACT INFORMATION', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setTextColor(...textColor)
  doc.text(`${data.yourName}`, 20, yPosition)
  if (data.yourEmail) {
    yPosition += 6
    doc.text(`Email: ${data.yourEmail}`, 20, yPosition)
  }
  if (data.yourPhone) {
    yPosition += 6
    doc.text(`Phone: ${data.yourPhone}`, 20, yPosition)
  }
  
  // Footer
  yPosition += 25
  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text('Thank you for considering this proposal. I look forward to working with you.', 20, yPosition)
  
  yPosition += 10
  doc.text('This proposal is valid for 30 days from the date above.', 20, yPosition)
  
  // Generate filename and download
  const filename = `${data.clientName.replace(/[^a-z0-9]/gi, '_')}_${data.projectTitle.replace(/[^a-z0-9]/gi, '_')}_Proposal.pdf`
  doc.save(filename)
  
  return filename
}

// Template-specific styling (future enhancement)
export function getTemplateStyles(templateId: string) {
  const styles = {
    'clean-modern': {
      primaryColor: [59, 130, 246],
      font: 'helvetica',
      headerSize: 24
    },
    'corporate-professional': {
      primaryColor: [55, 65, 81],
      font: 'times',
      headerSize: 22
    },
    'creative-brief': {
      primaryColor: [168, 85, 247],
      font: 'helvetica',
      headerSize: 26
    },
    'consulting-focused': {
      primaryColor: [16, 185, 129],
      font: 'helvetica',
      headerSize: 24
    },
    'technical-specification': {
      primaryColor: [99, 102, 241],
      font: 'courier',
      headerSize: 20
    }
  }
  
  return styles[templateId as keyof typeof styles] || styles['clean-modern']
}