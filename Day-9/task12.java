public class task12 {

    private StringBuffer s;

    private StringBuffer createStringBuffer(){
        s = new StringBuffer();
        s.append("Hello");
        return s;
    }

    private StringBuffer clearStringBuffer(){
        s.delete(0, s.length());
        return s;
    }
    
    public static void main(String[] args) {
        task12 task_12 = new task12();
        
        // Create string buffer
        StringBuffer value = task_12.createStringBuffer();
        System.out.println("After StringBuffer Creation : "+value);

        // Clear string buffer
        StringBuffer value1 = task_12.clearStringBuffer();
        System.out.println("After Clear : "+value1);

    }
}
