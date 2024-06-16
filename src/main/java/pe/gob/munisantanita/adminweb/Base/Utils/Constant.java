package pe.gob.munisantanita.adminweb.Base.Utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class Constant {
	
	public static final String PRINCIPAL_URL = "http://172.16.36.20/"; //http://localhost:4141/   http://172.16.36.10:8080/
	public static final String BASE_URL = PRINCIPAL_URL + "AdminWeb/";
	public static final String ASSETS = BASE_URL + "cdn/admin/";
	
	public static final String LLAVE_ENCRIPTACION = "FWMA$wg<6&LRYd=Q";
	
	
	public static final String URL_SERVER_CDN_DTA = "data/"; //http://172.16.36.47:8080/
	
	public static final String URL_SERVER_CDN_URL = PRINCIPAL_URL + URL_SERVER_CDN_DTA; //http://localhost:8080/    //http://172.16.36.41/
	
	
	public static final String DIR_UPLOAD_NOTICIAS_GALERIA = "/web/noticias/galeria/";
	public static final String DIR_UPLOAD_DATA_NOTICIAS_GALERIA = URL_SERVER_CDN_DTA + DIR_UPLOAD_NOTICIAS_GALERIA;
	
	public static final String DIR_UPLOAD_EVENTOS_GALERIA = "/web/eventos/galeria/";
	public static final String DIR_UPLOAD_DATA_EVENTOS_GALERIA = URL_SERVER_CDN_DTA + DIR_UPLOAD_EVENTOS_GALERIA;
	
	
	public static final String DIR_UPLOAD_USUARIOS_AVATARES = "/web/usuarios/avatares/";
	public static final String DIR_UPLOAD_DATA_USUARIOS_AVATARES = URL_SERVER_CDN_DTA + DIR_UPLOAD_USUARIOS_AVATARES;
	
	
	public static final String DIR_UPLOAD_RESOLUCIONES_ARCHIVOS = "/web/usuarios/avatares/";
	public static final String RESOLUCIONES_ARCHIVOS = URL_SERVER_CDN_DTA + DIR_UPLOAD_RESOLUCIONES_ARCHIVOS;

		
		/*
	public static final String API_USUARIOS_SLUG = "MicroservicioUsuarios";
	public static final String API_USUARIOS_URL = "http://172.16.36.47:8080/" + API_USUARIOS_SLUG; //http://localhost:8080/
	
	public static final String API_NOTICIAS_SLUG = "MicroservicioNoticias";
	public static final String API_NOTICIAS_URL = "http://localhost:8080/" + API_NOTICIAS_SLUG; //http://localhost:8080/
	
	public static final String API_EVENTOS_SLUG = "MicroservicioEventos";
	public static final String API_EVENTOS_URL = "http://localhost:8080/" + API_EVENTOS_SLUG; //http://localhost:8080/
	
	public static final String API_RESOLUCIONES_SLUG = "MicroservicioResoluciones";
	public static final String API_RESOLUCIONES_URL = "http://localhost:8080/" + API_RESOLUCIONES_SLUG; //http://localhost:8080/
	
	public static final String API_TALLERES_SLUG = "ApiTalleres";
	public static final String API_TALLERES_URL = "http://localhost:8080/" + API_TALLERES_SLUG; //http://localhost:8080/
	
	public static final String API_ARCHIVOS_SLUG = "ApiArchivos";
	public static final String API_ARCHIVOS_URL = "http://localhost:8080/" + API_ARCHIVOS_SLUG; //http://localhost:8080/
	*/

	public static final String API_USUARIOS_NOMBRE = "MicroservicioUsuarios";
	public static final String API_NOTICIAS_NOMBRE = "MicroservicioNoticias";
	public static final String API_EVENTOS_NOMBRE = "MicroservicioEventos";
	public static final String API_RESOLUCIONES_NOMBRE = "MicroservicioResoluciones";
	public static final String API_TALLERES_NOMBRE = "ApiTalleres";
	public static final String API_ARCHIVOS_NOMBRE = "ApiArchivos";

	public static final Map<String, String> API_REST = Collections.unmodifiableMap(
    	    new HashMap<String, String>() {{
    	        put(API_USUARIOS_NOMBRE,  			"http://172.16.36.10:8080/"); // http://localhost:4242/
    	        put(API_NOTICIAS_NOMBRE,  			"http://172.16.36.10:8080/"); //http://localhost:4343/
    	        put(API_EVENTOS_NOMBRE,  			"http://172.16.36.10:8080/"); //http://localhost:4545/
    	        put(API_RESOLUCIONES_NOMBRE,  		"http://172.16.36.10:8080/"); //http://localhost:8080/
    	        put(API_TALLERES_NOMBRE,  			"http://172.16.36.10:8080/"); //http://localhost:8080/
    	        put(API_ARCHIVOS_NOMBRE,  			"http://172.16.36.20/"); //http://localhost:8080/
    	    }});
    
	


}
