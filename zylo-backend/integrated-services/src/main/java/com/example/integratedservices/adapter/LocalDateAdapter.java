package com.example.integratedservices.adapter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateAdapter implements JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {

  private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
      "yyyy-MM-dd");

  @Override
  public JsonElement serialize(LocalDate localDate, Type type,
      JsonSerializationContext jsonSerializationContext) {
    return new JsonPrimitive(localDate.format(formatter));
  }

  @Override
  public LocalDate deserialize(JsonElement json, Type typeOfT,
      JsonDeserializationContext context) {
    return LocalDate.parse(json.getAsString(), formatter);
  }
}
