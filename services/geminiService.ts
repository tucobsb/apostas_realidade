import { GoogleGenAI } from "@google/genai";
import { Market } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeMarket = async (market: Market): Promise<string> => {
  if (!apiKey) {
    return "Chave de API não configurada.";
  }

  try {
    const prompt = `
      Atue como um analista financeiro sênior especializado no mercado brasileiro.
      Analise o seguinte mercado de previsão (prediction market):
      
      Título: "${market.title}"
      Descrição: "${market.description}"
      Probabilidade Atual (Sim): ${(market.yesPrice * 100).toFixed(1)}%
      Probabilidade Atual (Não): ${(market.noPrice * 100).toFixed(1)}%
      Regras: "${market.rules}"

      Forneça um resumo conciso em 3 tópicos (bullet points):
      1. Fatores principais para o resultado "SIM".
      2. Fatores principais para o resultado "NÃO".
      3. Um possível evento "Cisne Negro" (inesperado) que mudaria o cenário.

      Mantenha o tom profissional, neutro e focado em dados reais. Use Português do Brasil.
      Não dê conselhos de investimento.
      Formate a saída em Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Sem análise disponível.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "Erro ao gerar análise. Tente novamente mais tarde.";
  }
};