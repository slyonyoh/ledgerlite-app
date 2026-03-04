import 'package:hive/hive.dart';

class OfflineQueue {
  static const boxName = 'sync_queue';

  Future<void> enqueue(Map<String, dynamic> item) async {
    final box = await Hive.openBox(boxName);
    await box.add(item);
  }
}
