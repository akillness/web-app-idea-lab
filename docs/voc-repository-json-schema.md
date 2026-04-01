# Voice-of-Customer Repository — JSON Schemas

## Conversation Record
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ConversationRecord",
  "type": "object",
  "required": ["id", "workspace_id", "raw_text", "source_type", "processing_status", "created_at"],
  "properties": {
    "id": {"type": "string"},
    "workspace_id": {"type": "string"},
    "title": {"type": ["string", "null"]},
    "source_label": {"type": ["string", "null"]},
    "source_type": {"type": "string", "enum": ["interview", "sales_call", "support_ticket", "review", "other"]},
    "raw_text": {"type": "string"},
    "processing_status": {"type": "string", "enum": ["pending", "processing", "complete", "failed"]},
    "created_at": {"type": "string"}
  }
}
```

## Record Extraction
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RecordExtraction",
  "type": "object",
  "required": ["record_id", "summary", "pain_points", "objections", "feature_requests", "sentiment"],
  "properties": {
    "record_id": {"type": "string"},
    "customer_segment": {"type": ["string", "null"]},
    "company_stage": {"type": ["string", "null"]},
    "job_to_be_done": {"type": "array", "items": {"type": "string"}},
    "pain_points": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "severity", "evidence"],
        "properties": {
          "label": {"type": "string"},
          "severity": {"type": "integer", "minimum": 1, "maximum": 5},
          "evidence": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "objections": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "evidence"],
        "properties": {
          "label": {"type": "string"},
          "evidence": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "feature_requests": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "evidence"],
        "properties": {
          "label": {"type": "string"},
          "evidence": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "sentiment": {"type": "string", "enum": ["positive", "mixed", "negative"]},
    "churn_risk": {"type": "string", "enum": ["low", "medium", "high", "unknown"]},
    "buying_signal": {"type": "string", "enum": ["low", "medium", "high", "unknown"]},
    "summary": {"type": "string"}
  }
}
```

## Theme Cluster
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ThemeCluster",
  "type": "object",
  "required": ["theme_name", "theme_type", "frequency", "representative_evidence"],
  "properties": {
    "theme_name": {"type": "string"},
    "theme_type": {"type": "string", "enum": ["pain", "objection", "feature_request", "jtbd"]},
    "frequency": {"type": "integer", "minimum": 0},
    "segments": {"type": "array", "items": {"type": "string"}},
    "severity_summary": {"type": ["string", "null"]},
    "representative_evidence": {"type": "array", "items": {"type": "string"}},
    "suggested_action": {"type": ["string", "null"]}
  }
}
```