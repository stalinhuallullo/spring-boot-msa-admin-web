package pe.gob.munisantanita.adminweb.Base.Utils;

import java.io.IOException;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pe.gob.munisantanita.adminweb.Base.Model.AutentificacionUsuario;

@Component
public class Helper {
	

	  public static String assets(String str) {       
	        return Constant.ASSETS + str;
	    }
	  
	  public static String baseUrl(String str) {       
	        return Constant.BASE_URL + str;
	    }
	  /*
	  public static String apiServer(String str) {       
	        return Constant.BASE_URL + str;
	  }*/
	  
	  public static String apiUsuarios(String uri) {       
	        return Constant.API_REST.get(Constant.API_USUARIOS_NOMBRE) + Constant.API_USUARIOS_NOMBRE + "/" +  uri;
	  }
	  
	  public static String apiNoticias(String uri) {       
	        return Constant.API_REST.get(Constant.API_NOTICIAS_NOMBRE) + Constant.API_NOTICIAS_NOMBRE + "/" +  uri;
	  }
	  
	  public static String apiEventos(String uri) {       
	        return Constant.API_REST.get(Constant.API_EVENTOS_NOMBRE) + Constant.API_EVENTOS_NOMBRE + "/" +  uri;
	  }
	  
	  public static String apiResoluciones(String uri) {       
	        return Constant.API_REST.get(Constant.API_RESOLUCIONES_NOMBRE) + Constant.API_RESOLUCIONES_NOMBRE + "/" +  uri;
	  }
	  
	  public static String apiRecursos(String str) {       
	        return Constant.URL_SERVER_CDN_URL + str;
	  }
	  
	  
	  
	  public static String apiGlobal(String nombre, String uri) {       
	        return Constant.API_REST.get(nombre) + uri;
	  }
	  
	  public static String apiLocal(String apiNombre) {       
	        return Constant.BASE_URL + "api/" + apiNombre + "/";
	  }
	  
	  
	  public static String apiNoticia(String uri) {       
	        return Constant.BASE_URL + "api/MicroservicioNoticias/"+uri;
	    }
	  

	  public static String Vista(String str) {       
	        return "admin/pages/"+str;
	    }
	  
	  public static AutentificacionUsuario sesion() {       
			return (AutentificacionUsuario)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	  }  


}
