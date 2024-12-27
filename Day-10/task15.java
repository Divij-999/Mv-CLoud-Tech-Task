import java.util.Scanner;

public class task15 {

    static int countDig(int n)  
    {   
    String str = Integer.toString(n);   
    int size = str.length();  
    return size;  
    }  

    static int power(int n , int length){
        int count = 1;
        int mul = 1;
        while(count<=length){
            mul*=n;
            count++;
        }
        return mul;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number : ");
        int n = sc.nextInt();
        int n1 = n;
        int length = countDig(n);
        // System.out.println(length);
        int sum = 0;
        while(true){
            sum+=power(n%10, length);
            if (n-(n%10)==0){
                break;
            }
            n = (n-(n%10))/10;
        }
        // System.out.println(sum);
        if(sum==n1){
            System.out.println(n1+" is a Armstrong number.");
        }
        else{
            System.out.println(n1+" is a Not Armstrong number.");
        }

        sc.close();
    }
}
