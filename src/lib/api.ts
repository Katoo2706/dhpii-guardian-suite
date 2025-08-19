import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'dhpii-api-key', // Default API key
  },
});

// API response types
export interface DetectedEntity {
  entity_type: string;
  text: string;
  start: number;
  end: number;
  confidence: number;
}

export interface TextDetectionRequest {
  text: string;
  language?: string;
  entities?: string[];
  confidence_threshold?: number;
  allow_list?: string[];
}

export interface TextDetectionResponse {
  results: DetectedEntity[];
  statistics: Record<string, any>;
  language_used: string;
  session_id: string;
}

export interface ImageDetectionResponse {
  results: DetectedEntity[];
  statistics: Record<string, any>;
  session_id: string;
}

export interface TextAnonymizationRequest {
  text: string;
  anonymization_type: string;
  entities?: string[];
  config?: Record<string, any>;
}

export interface TextAnonymizationResponse {
  anonymized_text: string;
  anonymized_entities: DetectedEntity[];
  statistics: Record<string, any>;
  session_id: string;
}

export interface ImageAnonymizationResponse {
  anonymized_entities: DetectedEntity[];
  statistics: Record<string, any>;
  anonymized_image_id: string;
  anonymized_image_url: string;
  session_id: string;
}

// API methods
export const apiMethods = {
  // Detection
  async detectText(data: TextDetectionRequest): Promise<TextDetectionResponse> {
    const response = await api.post('/api/v1/detection/text', data);
    return response.data;
  },

  async detectImage(file: File, language = 'en', entities?: string[], confidence_threshold = 0.4): Promise<ImageDetectionResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('language', language);
    if (entities) {
      entities.forEach(entity => formData.append('entities', entity));
    }
    
    const response = await api.post('/api/v1/detection/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { confidence_threshold }
    });
    return response.data;
  },

  async getSupportedLanguages(): Promise<Record<string, string>> {
    const response = await api.get('/api/v1/detection/languages');
    return response.data;
  },

  // Anonymization
  async anonymizeText(data: TextAnonymizationRequest): Promise<TextAnonymizationResponse> {
    const response = await api.post('/api/v1/anonymization/text', data);
    return response.data;
  },

  async anonymizeImage(
    file: File, 
    anonymization_type = 'redaction', 
    language = 'en',
    entities?: string[],
    confidence_threshold = 0.4,
    fill = 'black'
  ): Promise<ImageAnonymizationResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('anonymization_type', anonymization_type);
    formData.append('language', language);
    formData.append('confidence_threshold', confidence_threshold.toString());
    formData.append('fill', fill);
    
    if (entities) {
      entities.forEach(entity => formData.append('entities', entity));
    }
    
    const response = await api.post('/api/v1/anonymization/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    const response = await api.get('/health');
    return response.data;
  }
};

// Common entity types
export const COMMON_ENTITIES = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'CREDIT_CARD',
  'SSN',
  'DATE_TIME',
  'LOCATION',
  'ORGANIZATION',
  'URL',
  'IP_ADDRESS',
  'IBAN_CODE',
  'US_DRIVER_LICENSE',
  'US_PASSPORT',
  'MEDICAL_LICENSE',
  'US_BANK_NUMBER'
];

// Anonymization types
export const ANONYMIZATION_TYPES = [
  { value: 'mask', label: 'Mask (replace with *)' },
  { value: 'replace', label: 'Replace with placeholder' },
  { value: 'redaction', label: 'Redaction (black boxes)' },
  { value: 'hash', label: 'Hash (SHA-256)' },
  { value: 'pseudonymize', label: 'Pseudonymize' },
  { value: 'encrypt', label: 'Encrypt' }
];