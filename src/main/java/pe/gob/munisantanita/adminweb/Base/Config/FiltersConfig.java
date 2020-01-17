package pe.gob.munisantanita.adminweb.Base.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
public class FiltersConfig {

    @Bean
    public CharacterEncodingFilter characterEncodingFilter() {
        final CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("ISO-8859-1");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }

}