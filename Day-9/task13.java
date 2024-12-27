import java.util.Scanner;

public class task13 {

    private StringBuffer value;

    private void createStringBuffer(String valueString){
        value = new StringBuffer();
        value.append(valueString);
    }

    private StringBuffer encrypt(){
        String temp = "";
        for(int i = 0 ; i<value.length() ; i++){
            temp+=(char) ((int) value.charAt(i)+3);
        }
        value.setLength(0);
        value.append(temp);
        return value;
    }

    private StringBuffer deEncrypt(){
        String temp = "";
        for(int i = 0 ; i<value.length() ; i++){
            temp+=(char) ((int) value.charAt(i)-3);
        }
        value.setLength(0);
        value.append(temp);
        return value;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter String to encrpyt using cipher method : ");
        String valueString = sc.nextLine();
        task13 t = new task13();
        System.out.println("\n");

        //Retriving value
        t.createStringBuffer(valueString);
        System.out.println("Orignal Text : "+valueString);

        // Encrypting Value
        StringBuffer e = t.encrypt();
        System.out.println("Encrypted Value : "+e);

        // DeEncrypting Value
        StringBuffer de = t.deEncrypt();
        System.out.println("DeEncrypted Value : "+de+"\n");
        sc.close();
    }
}
