$payload = @{ 
  model = "meta/llama3-70b-instruct"
  messages = @(@{ role = "user"; content = "Explain AI in simple terms" })
  temperature = 0.7
  max_tokens = 200
} | ConvertTo-Json -Compress

curl.exe -X POST "https://integrate.api.nvidia.com/v1/chat/completions" -H "Authorization: Bearer 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" -H "Content-Type: application/json" -d $payload
