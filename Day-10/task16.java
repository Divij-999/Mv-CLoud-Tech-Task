import java.util.Scanner;

public class task16 {

    static int combo(int numDice, int targetSum) {

        if (numDice == 0) {
            return targetSum == 0 ? 1 : 0;
        }

        if (targetSum < 0 || numDice > targetSum || numDice * 6 < targetSum) {
            return 0;
        }

        int combinations = 0;
        for (int i = 1; i <= 6; i++) {
            // System.out.println(combinations);
            combinations += combo(numDice - 1, targetSum - i);
        }

        return combinations;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no of dices : ");
        int diceCount = sc.nextInt();
        System.out.println("Enter total : ");
        int total = sc.nextInt();
        System.out.println(combo(diceCount, total)); 
        sc.close();
    }
}
