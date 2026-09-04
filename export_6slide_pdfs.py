import os
import win32com.client

def export_deck(pptx_path, pdf_path, export_images=False, img_dir=None):
    abs_pptx = os.path.abspath(pptx_path)
    abs_pdf = os.path.abspath(pdf_path)
    
    print(f"Opening: {abs_pptx}")
    powerpoint = win32com.client.Dispatch("PowerPoint.Application")
    try:
        deck = powerpoint.Presentations.Open(abs_pptx, WithWindow=False)
        deck.SaveAs(abs_pdf, 32) # ppSaveAsPDF = 32
        print(f"Exported PDF: {abs_pdf}")
        
        if export_images and img_dir:
            os.makedirs(img_dir, exist_ok=True)
            for idx, slide in enumerate(deck.Slides):
                img_path = os.path.join(img_dir, f"slide_{idx+1}.png")
                slide.Export(img_path, "PNG", 1920, 1080)
                print(f"Exported Slide {idx+1} -> {img_path}")
                
        deck.Close()
    except Exception as e:
        print(f"Error during export: {e}")
        raise e
    finally:
        powerpoint.Quit()

if __name__ == "__main__":
    elim_pptx = r"c:\Users\Chirag Vasava\Downloads\Personal\College\MSU\Hackathone\MSU Hack-A-Throne 2026\Elimination Submission\GramSaarthi_AI_Hackathon_Presentation.pptx"
    elim_pdf = r"c:\Users\Chirag Vasava\Downloads\Personal\College\MSU\Hackathone\MSU Hack-A-Throne 2026\Elimination Submission\GramSaarthi_AI_Hackathon_Presentation.pdf"
    elim_dir = r"c:\Users\Chirag Vasava\Downloads\Personal\College\MSU\Hackathone\MSU Hack-A-Throne 2026\Elimination Submission"
    
    md_pptx = r"MD_Files\GramSaarthi_AI_Hackathon_Presentation.pptx"
    md_pdf = r"MD_Files\GramSaarthi_AI_Hackathon_Presentation.pdf"
    
    print("--- Exporting Elimination Submission Deck ---")
    export_deck(elim_pptx, elim_pdf, export_images=True, img_dir=elim_dir)
    
    print("--- Exporting MD_Files Deck ---")
    export_deck(md_pptx, md_pdf, export_images=False)
