import 'package:flutter/material.dart';

void main() {
  runApp(const LedgerLiteApp());
}

class LedgerLiteApp extends StatelessWidget {
  const LedgerLiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LedgerLite',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0D6EFD)),
        useMaterial3: true,
      ),
      home: const OnboardingScreen(),
    );
  }
}

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Icon(Icons.account_balance_wallet, size: 72),
            const SizedBox(height: 12),
            const Text('Welcome to LedgerLite', textAlign: TextAlign.center, style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
            const SizedBox(height: 24),
            _step('1', 'Verify phone number'),
            _step('2', 'Setup business profile'),
            _step('3', 'Start adding sales and expenses'),
            const SizedBox(height: 24),
            SizedBox(
              height: 56,
              child: FilledButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DashboardScreen())),
                child: const Text('Continue', style: TextStyle(fontSize: 20)),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _step(String num, String text) => Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(children: [CircleAvatar(radius: 16, child: Text(num)), const SizedBox(width: 12), Expanded(child: Text(text, style: const TextStyle(fontSize: 18)))]));
}

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cards = const [
      ['Revenue', '₦120,000'],
      ['Expenses', '₦45,000'],
      ['Net Profit', '₦75,000'],
      ['Receivables', '₦25,000'],
      ['Payables', '₦10,000']
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('LedgerLite Dashboard')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ...cards.map((c) => Card(
                child: ListTile(
                  title: Text(c[0], style: const TextStyle(fontSize: 18)),
                  trailing: Text(c[1], style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                ),
              )),
          const SizedBox(height: 12),
          SizedBox(height: 56, child: FilledButton(onPressed: () {}, child: const Text('Add Income', style: TextStyle(fontSize: 20)))),
          const SizedBox(height: 8),
          SizedBox(height: 56, child: OutlinedButton(onPressed: () {}, child: const Text('Add Expense', style: TextStyle(fontSize: 20)))),
        ],
      ),
    );
  }
}
