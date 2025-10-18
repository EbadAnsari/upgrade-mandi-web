import java.util.Scanner;
import java.util.Stack;

class Example {
	public static void main(String[] args) {
		Stack<Integer> stack = new Stack<>();
		Scanner sc = new Scanner(System.in);
		int N = sc.nextInt();
		for (int i = 0; i < N; i++) {
			int num = sc.nextInt();
			if (num == 0)
				stack.pop();
			else
				stack.push(num);
		}
		int sum = 0;
		while (!stack.isEmpty()) {
			sum += stack.pop();
		}
		System.out.println(sum);
		sc.close();
	}
}