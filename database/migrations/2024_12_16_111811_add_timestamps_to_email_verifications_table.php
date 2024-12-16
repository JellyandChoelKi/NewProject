<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestampsToEmailVerificationsTable extends Migration
{
    public function up()
    {
        Schema::table('email_verifications', function (Blueprint $table) {
            $table->timestamps(); // created_at 및 updated_at 컬럼 추가
        });
    }

    public function down()
    {
        Schema::table('email_verifications', function (Blueprint $table) {
            $table->dropTimestamps(); // created_at 및 updated_at 컬럼 제거
        });
    }
}
