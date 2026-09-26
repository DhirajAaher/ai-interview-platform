package com.dhiraj.ai_interview_platform.service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

@Service
public class ResumeTextExtractionService {

    public String extractText(String filePath) {

        Path path = Paths.get(filePath);

        try (PDDocument document = Loader.loadPDF(path.toFile())) {

            PDFTextStripper stripper = new PDFTextStripper();

            String text = stripper.getText(document);

            if (text == null || text.isBlank()) {
                throw new RuntimeException(
                        "No readable text found in the PDF."
                );
            }

            return text.trim();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to extract text from resume PDF.",
                    e
            );
        }
    }
}