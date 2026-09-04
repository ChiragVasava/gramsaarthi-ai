import os
import sys
import win32com.client

def convert_pptx_to_pdf(input_pptx, output_pdf):
    abs_pptx = os.path.abspath(input_pptx)
    abs_pdf = os.path.abspath(output_pdf)
    
    print(f"Converting {abs_pptx} to {abs_pdf}...")
    
    # Initialize PowerPoint application
    powerpoint = win32com.client.Dispatch("PowerPoint.Application")
    try:
        # Open the presentation (32 is the constant for ppSaveAsPDF)
        deck = powerpoint.Presentations.Open(abs_pptx, WithWindow=False)
        deck.SaveAs(abs_pdf, 32)
        deck.Close()
        print(f"PDF successfully created at: {abs_pdf}")
    except Exception as e:
        print(f"Error converting via PowerPoint COM: {e}")
        raise e
    finally:
        powerpoint.Quit()

if __name__ == "__main__":
    pptx_file = os.path.join("MD_Files", "GramSaarthi_AI_Hackathon_Presentation.pptx")
    pdf_file = os.path.join("MD_Files", "GramSaarthi_AI_Hackathon_Presentation.pdf")
    convert_pptx_to_pdf(pptx_file, pdf_file)
