package ru.profind.mscore.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest
{
    String status;
    String name;
    String about;
    String goal;
    String program_language;
    String no_valid;
}
