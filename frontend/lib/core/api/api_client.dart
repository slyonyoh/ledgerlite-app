import 'package:dio/dio.dart';

class ApiClient {
  final Dio _dio = Dio(BaseOptions(baseUrl: 'https://api.ledgerlite.app'));

  Future<Response<dynamic>> get(String path) => _dio.get(path);
  Future<Response<dynamic>> post(String path, Map<String, dynamic> body) => _dio.post(path, data: body);
}
