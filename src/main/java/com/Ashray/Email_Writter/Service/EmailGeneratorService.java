package com.Ashray.Email_Writter.Service;

import com.Ashray.Email_Writter.Model.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.awt.event.HierarchyBoundsAdapter;
import java.util.Map;

@Service
public class EmailGeneratorService {


    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
         this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        //Build the proomt

        String promt=buildPromt(emailRequest);

        //Craft a request

        Map<String , Object> requestBody= Map.of(
                "contents",new Object[] {
                        Map.of("parts",new  Object[] {
                                Map.of("text",promt)
                        })
                }

        );


        //Do request and get response 

        String reponse = webClient.post()
                .uri(geminiApiUrl +  "?key=" + geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        // Extract Response and Return

        return  extractResponseContent(reponse);


    }

    private String extractResponseContent(String reponse) {

        try {

        ObjectMapper objectMapper=new ObjectMapper();
            JsonNode rootNode=objectMapper.readTree(reponse);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {


            return "Error porcessing message " + e.getMessage();

        }
    }

    private String buildPromt(EmailRequest emailRequest) {
        StringBuilder promt=new StringBuilder();
        promt.append("Generate one   professional email reply for the following email content . please don't generate the subject line ");
                if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
                    promt.append("Use a ").append(emailRequest.getTone()).append(" tone ");
                }

                promt.append("\n Original Email: \n").append(emailRequest.getEmailContent());

                return promt.toString();
    }
}
