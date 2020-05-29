## 初めに
こんにちは！Classmethodの新卒エンジニアのホンギです。
[以前のレポート](https://dev.classmethod.jp/articles/summit_korea_rapidly_transfer_content/)に続いてセッションレポートを作成してみました。
韓国のエンジニアの方々が色んなセッションのレポートを作成しているので、興味がありましたら、是非他のレポートも読んでみてください！
<iframe
  class="hatenablogcard"
  style="width:100%;"
  frameborder="0"
  scrolling="no"
  src="https://hatenablog-parts.com/embed?url=https://dev.classmethod.jp/series/aws-summit-online-korea-2020/"
></iframe>

本記事では技術トラック1番の「S3、君はここまでできるね(Amazon S3新規機能紹介)」セッションの記事です。記事で使用された当該セッションのPPT資料は[PDF資料(韓国語)](https://mktg-apac.s3-ap-southeast-1.amazonaws.com/AWS+Summit+Online+Korea/Track3_Session5_S3,+%EB%84%8C+%EC%9D%B4%EA%B2%83%EA%B9%8C%EC%A7%80+%ED%95%A0+%EC%88%98+%EC%9E%88%EB%84%A4(Amazon+S3+%EC%8B%A0%EA%B7%9C+%EA%B8%B0%EB%8A%A5+%EC%86%8C%EA%B0%9C).pdf)をお読みください！  
よろしくお願いします!🙇‍♂️

### Speaker
- Kim Sejoon - AWS Solutions Architect

### Agenda
1. コスト削減
2. セキュリティ及びアクセス
3. データ管理  

今回のセッションで紹介されたS3の新規機能は大きく9つあり、上記の3つのカテゴリーに分けて説明します。

## コスト削減
<p align="center"><img src=https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/1-3-640x152.png></p> 
<p align="center">(S3のストレージクラス)</p>

コスト削減では新規機能である**S3 Intelligent-Tiering**と**S3 Glacier Deep Archive**を紹介します。

### 最新ストレージクラス
- [S3 Intelligent-Tiering](https://aws.amazon.com/ko/about-aws/whats-new/2018/11/s3-intelligent-tiering/)はS3にあるデータをユーザーの代わりに自動でコストを最適化することで、ストレージ管理機能に革新を提供し
- [S3 Glacier Deep Archive](https://aws.amazon.com/ko/blogs/korea/new-amazon-s3-storage-class-glacier-deep-archive/)は最も安いストレージクラスとして、クラウドストレージコストを革新させます。

### Glacier Deep Archiveとは? (NEW 2019年3月)
>  Amazon S3で最も安価なストレージクラスであり、年に1、2回アクセスできるデータの長期保管およびデジタル保存をサポートします。

- 重要だが頻繁にアクセスされないデータをより経済的にAmazon S3に保存できる新しい長期保管用ストレージクラス
- ストレージクラス分析、オブジェクトタグ指定、オブジェクトロック、交差リージョン複製などの他のS3機能も使用できる

### Glacier Deep Archiveの特徴
- GB当たり$0.002/月の格安ストレージ
- テープバックアップと比較したとき、カートリッジやラバーの管理が不要である。
- すべての作業はS3 コンソールとAWS API を通じて行われ99.999999999%の高い耐久性を有する。
- 12時間以内にS3でデータを復旧できる。

### GlacierとGlacier Deep Archiveの比較

|              |                  S3 Glacier                   | S3 Glacier Deep Archive  |
| :----------: | :-------------------------------------------: | :----------------------: |
|    コスト    |              GB当たり*$0.005/月               |    GB当たり*$0.002/月    |
|   検索時間   | 緊急:1 - 5分、標準:3 - 5時間、大量:5 - 12時間 | 標準:12時間、大量:48時間 |
| 最小保存期間 |                     90日                      |          180日           |

- コスト面ではGlacierが高いが、検索時間面ではGlacier Deep Archiveよりも速い。
- 保存すべきデータ期間が180日以上で、12時間以上の復旧時間RTO(Recovery Time Objective)を許可できれば、Glacier Deep Archiveの使用がより安くなります。

### S3 Intelligent-Tieringとは? (re:Invent 2018)
> このストレージクラスは寿命が長く、アクセスパターンがわからなかったり、予測できないデータに理想的で、性能の影響または運用オーバーヘッドなしに最も費用効果的なアクセス階層にデータを自動で移動して費用を最適化するために設計されました。

#### S3 Intelligent-Tieringの特徴
- 主にわからなかったり、変化するアクセスの場合使用する。
- **2つのアクセス階層**に保存して作動し、アクセスパターンの変化を基盤に2つのアクセス階層間でオブジェクトを自動で移動
- 1つの階層は頻繁なアクセスに合わせて最適化され、もう1つの階層は頻繁でないアクセスに合わせて最適化される。

#### Intelligent-Tieringの目的
- 下記のように以前はデータアクセスパターンに応じて3つのストレージクラスで構築しました。
- データアクセスパターンが可能な場合：ライフサイクルポリシーを使用しコストを削減

![2](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/2-4-640x456.png)

利点：ライフサイクルポリシーを使用すると、設定した期間によってデータを他のクラスを自動で移動させることができる。

![3](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/3-4.png)

新しいアプリケーションを開発したときのアクセスパターンの定義は非常に難しいことです。    
それで、自動でコストを最適化するIntelligent-Tiering S3クラスがリリーズされました。

#### S3 Intelligent-Tieringの動作原理

![4](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/4-4.png)

1. PUTの選択的フラグを使用したり、ライフサイクルポリシーを使用し、S3 **Intelligent-Tieringに**オブジェクト配置
2. オブジェクトは最初の**30日間、Frequent Access階層に分類**される。
3. **30日間オブジェクトにアクセスしないと**自動的に**Infrequent Access**階層に分類される。
4. **Infrequent Access階層のオブジェクトにアクセスすると**、再び30日間**自動的にFrequent Accessに再分類される。**

この4つの過程は、データが存在する限り繰り返し続けられ、パターンが変更されるとしても、性能、運用オーバーヘッド、検索コストには変化がないのが特徴です。

### S3 Inventoryを利用したIntelligent-Tieringアクセス分析(NEW)

![5](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/5-2-640x338.png)

- [S3 Inventory Report](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/dev/storage-inventory.html)(New 2019年10月)を使用すると、**保存されたオブジェクトのアクセス階層**を確認することができる。
- 毎日、毎週バケットにあるすべてのオブジェクトに対してメタ情報を生成する。
- オプションフィールドでIntelligent-Tieringを活性化すると, [Athena](https://docs.aws.amazon.com/ko_kr/athena/latest/ug/what-is.html)を使って簡単なクエリーだけでオブジェクトに対するアクセス階層を確認することができる。

### コスト削減サマリー
1. 最も安いクラス - S3 Glacier Deep Archive
2. アクセスパターンによる階層分類 - S3 Intelligent-Tiering
3. バケットに保存されたオブジェクトのメタ情報を提供 - Access tiers in inventory reports

## セキュリティ及びアクセス

### Block Public Accessとは? (re:Invent 2018)
> この機能は、アカウントレベルだけでなく、後日生成されるバケットを含め、個別のバケットで作動する新しい次元の保護機能を提供します。  
AWSアカウントがデータレイクまたはその他のビジネスアプリケーションのホスティングに使用される場合、パブリックアクセスの遮断は、偶発的な公開露出に対するアカウントレベルの保護機能の役割をします。  
AWSの目標は、パブリックアクセスはウェブホスティングに使用されるべきであることを明確にすることです。

- 偶発的な公開アクセスを事前に遮断
- アカウントまたはバケットレベルをブロック
- ACLアクセス、バケットポリシーアクセス、または両方適用可能

![6](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/6-1-640x493.png)

また、選択的にACL及びバケットポリシーを使用し、他のアカウントにアクセス権限を与えることも可能です。  
詳細は [ブリックアクセスブロック](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/access-control-block-public-access.html)で確認できます。

### Access Analyzer for Amazon S3(NEW)
Block Public Accessを適用する前に、バケットアクセスに対する正確な分析が必要です。  
そこで今回のre:Invent 2019で[Access Analyzer for S3](https://aws.amazon.com/jp/about-aws/whats-new/2019/12/introducing-access-analyzer-for-amazon-s3-to-review-access-policies/)機能がリリーズされました。

- 共有アクセスのためのバケットモニタリングサービス
- S3コンソールで追加費用なしでパブリック及び他のアカウントに共有されたバケットの明細を確認できます。

![7](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/7-1-640x346.png)

- 機能 
  - ACLあるいはバケットポリシーによるパブリックアクセスが許可されたリストを確認することができる。
  - パブリックアクセスが許可されたバケットがある場合、分析された結果を保存することができる。
  - パブリックアクセスが不要だと判断すると、一度のクリックで遮断することができる。
  - 監査のため、結果をCSV 形態でダウンロードできる。

### Amazon S3 Access Pointsとは? (NEW)
> Amazon S3の共有データセットに対する大規模なデータアクセス管理を簡素化する新しいS3機能です。 S3アクセスポイントを使用すると、1バケット当たり数百個のアクセスポイントを簡単に作成でき、各ポイントにはアプリケーションに対してユーザーの指定された名前と使用権限が付与されます。

![8](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/8-1.png)

上記のように複数のグループからバケットにデータをアクセスすると仮定した場合、各グループに合わせてネームスペースやアクセスポイント、権限を設定するなどの管理作業が必要です。

[Access Points](https://aws.amazon.com/jp/s3/features/access-points/)は、上記のような例または問題ケースについて解決策を提示します。  

1. 様々なグループで要件に合わせて共有バケットにアクセスできるよう管理機能を提供
2. バケットの名前はバケットのアクセスネームが重ならないように新しいネームスペースを設定
3. 特定のトラフィックを特定のVPCに制限することができる。

#### 実装方法

![9-1](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/9-1-640x326.png)

- 様々なデータを共有バケットに保存すると、データ分析のためには非常に効果的であるが、ソースが多様で膨大になるにつれて管理が難しくなる。   
- また、システムに問題が発生した際に、多くの範囲に影響を与えることもある。

Access Points -共有バケットへのアクセス管理：データレイク

![10](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/9-640x306.png)

- Access Pointsを使用すると、すべてのデータ経路およびグループ別にAccess Pointを管理およびポリシーを割り当てることができる。
- 上記のように5つの経路にAccess Point を持ち、それぞれのポリシーによって特定のprefix およびtag に合ったオブジェクトへのアクセス権限を持つ。

![11](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/11-1-640x93.png)

- 削除したいパスがあれば、該当部分だけ除去することもできる。この場合、バケットに対する情報を失ってデータを送ることができないが、S3は変更する必要がない。


#### アカウントとネームスペースルール

![12](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/12-1-640x134.png)

- Name : アクセスポイントの名前
- AWS account : アカウント
- New subdomain : アクセスポイントを確認できるサブドメイン

**メリット**  

- 同一のアクセスポイントネームを複数リージョンで使用でき、グローバルアプリケーションに容易
- 上記のルールを適用するため、希望するNameで作成できる。
- アカウント当たり最大1000個のアクセスポイントを作成できる。

### VPC バインディング
特定のトラフィックに対して該当するアクセスポイントをVPCエンドポイントに制限することができます。  
VPC エンドポイントポリシーと同時に適用することで、双方向制御も可能です。

![13](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/13-1-640x303.png)

### Amazon S3 Access Pointsサマリー
1. アクセス対象を複数のグループに細分化できる。
2. グループ別にアクセスポイントを作ることができる。 (アカウントとリージョンアクセスポイントをVPCにバインディングできる)
3. アクセスポイント別にポリシーを適用できる。 (アクセスポイントを使用するグループ権限·アクセスポイント設定可能)
4. 中央制御：複製、暗号化などの**データ管理作業は中央で**行われるのが最大のメリット

### Access Pointの設定
![14](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/14-1-640x277.png)  
バケットコンソールに上のような新しいタブができました。

Access pointsタブで作ることができ、Use this access pointを押すと
![15](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/15-1-640x276.png)

アクセスポイントを通じて入ってくるようにデータを確認できます。

## データ管理

### S3 Batch Operations
オブジェクトの変換作業を処理するために、以前はEC2からデータを変換してS3にアップロードするなどのアプリケーションコードを別途作成する必要がありました。

Batch Operations機能を利用すれば、バッチ作業をより簡単に実現できます。

- 簡単に処理できること
  - タグの切り替え
  - アクセス制御変更
  - Amazon S3 Glacierでオブジェクト復旧
  - オブジェクトコピー
  - Lambda実行

### 大規模管理
以下のように、S3 コンソールにおいて配置作業を定義し、結果を確認することができます。
![17](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/17-2-640x347.png)

また、以下の通り完了報告書を要請することもできます。
![18](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/18-640x118.png)

リクエストしなくても、CloudWatchやCloudTrailを使用して作業をモニタリングすることもできます。

### S3 Replication
以前までは、Regionから他のRegionへの複製をすることができました。
最近、complianceとlegal遵守のために3つの機能をアップデートされました。

![19](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/19-1-640x292.png)

#### Same-Region replication
![20](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/20-1-640x595.png)  

- 間違ってデータを削除できないように保護
- 自動に全オブジェクトのバージョンを維持
- エンタープライズのようなストレージ複製機能

#### Same-Region replication UseCase
![21](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/21-640x307.png)

- Backup UseCase : ソースバケットのオブジェクトをバックアップアカウントにあるバケットに複製した後、所有権を変更し、オブジェクトロックまで設定、運用アカウントのデータが削除されてもバックアップアカウントのバケットのデータは保管されます。

![22](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/22-640x259.png)  

オブジェクトのロックおよび保存期間を設定して複数のリージョンに複製することができます。  
この機能は、ルール遵守および削除保護のためのデータ保護シナリオにおいて非常に有用です。  

- Log UseCase : 複数のアプリケーションで生成されたログを収集した後、一つのバケットでログ分析を実行、単一バケットですべてのログに対するログを分析することができる。

### Amazon S3 Replication Time Control(new)
Replication Time Control(RTC)は、S3にアップロードするほとんどのオブジェクトを数秒で複製し、このようなオブジェクトの99.99%を15分以内に複製します。

![23](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/23-640x228.jpg)

詳細は、[S3 Replication Time Control (S3 RTC)を使用してオブジェクトの複製](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/replication-time-control.html)を確認してください。

### 設定方法

![24](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/24-640x249.png)

S3コンソールのReplication ruleでReplication Time Controlを活性化するだけで適用が可能です。  
活性化すると、15分以内に99.9%のオブジェクトを複製することを約する
[SLA(サービスレベル契約)](https://aws.amazon.com/legal/service-level-agreements/)がサポートされます。

### 複製プロセスに対する可視性

![25](https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/05/25-1-640x346.png)

可視性を提供するために、3つのメトリックを提供しチェックすることができます。
1. 保留中の複製量
2. 保留中の複製作業
3. 複製待ち時間

### 3種類のS3イベントで複製モニタリング

すべての単一オブジェクトはイベントを発生させることができます。

例）複製されたケースとされないケース
test.jpgファイルが15分間複製されなければイベント発生(OperationMissedThreshold)  
test.jpgファイルがバケットに複製が完了するとイベント発生(OperationReplicatedAfterThreshold)  
発生したイベントはSQS queue及びSNS topicなどに接続でき、必要に応じてLambda functionも実行させることができます。

### まとめ
S3の新機能をコスト削減、セキュリティとアクセス、データ管理のカテゴリーに分けて見てきました。  
定義していないデータの保存期間とアクセスが増えるにつれ、自動的に管理するサービスがリリースされ、支えるセキュリティサービスまで知ることができてよかったです。  
設定も簡単なので、ビジネスに適用するのも簡単そうだなと思いました。  
これからも社内文化人情報発信に従って多くの記事を書きたいと思います。  
読んで頂きありがとうございます。
