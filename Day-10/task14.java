public class task14 {
    public static void main(String[] args) {
        String s = null; 
      
        try {
            // Throws NullPointerException
            System.out.println(s.length());

        } catch (NullPointerException e) {

            System.out.println(e);
            
        }
    }
}
